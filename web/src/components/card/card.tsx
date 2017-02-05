import * as React from "react";

import { browserHistory } from 'react-router';

import { IMarker } from "../location_map/IMarker";

import { ITrack } from "./ITrack";

import LocationStore from "../location_store";
import TrackStore from "./track_store";

import { CreateGetTracksActions } from "./actions/get_tracks";
import { CreateGetSuggestionsAction } from "./actions/get_suggestions";
import { CreateRemoveTrackAction } from "./actions/remove_track";
import { CreateAddTrackAction } from "./actions/add_track";
import { CreateGetLocationsAction } from '../location_map/actions/get_locations';

import MenuItem from 'material-ui/MenuItem';

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Avatar from 'material-ui/Avatar';
import Autocomplete from 'material-ui/AutoComplete';

import { List, ListItem } from 'material-ui/List';

export interface ICardProps {
    params: {
        locId: string
    }
}

export interface ICardState {
    marker?: IMarker;
    tracks?: Array<ITrack>;
    datasource?: any[];
}

export class Card extends React.Component<ICardProps, ICardState> {

    constructor() {
        super();
        this.state = {
            marker: null,
            tracks: TrackStore.getTracks(),
            datasource: []
        }
    }

    componentWillMount() {
        let mk = LocationStore.getMarkerByKey(this.props.params.locId);
        this.setState({
            marker: mk
        })
        TrackStore.on("TRACK_RECEIVED", this.getTracks.bind(this));
        TrackStore.on('SUGGESTIONS_RECEIVED', this.updateSuggestions.bind(this));
        TrackStore.on('REMOVE_TRACK', this.getTracks.bind(this))
        CreateGetTracksActions(mk.tracks);
    }

    addTrack(track: ITrack) {
        CreateAddTrackAction(track, this.state.marker.id);
    }

    updateSuggestions() {
        this.setState({
            datasource: TrackStore.getSuggestions().map((track) => {
                return {
                    text: "key",
                    value: (
                        <MenuItem
                            primaryText={track.name}
                            onClick={() => this.addTrack(track)}
                            rightAvatar={<Avatar src={track.album_cover}/>}
                        />
                    )

                }
            })
        })
    }

    componentWillUnmount() {
        TrackStore.clear();
    }

    getTracks() {
        this.setState({
            tracks: TrackStore.getTracks()
        });
    }

    dismiss(y: boolean) {
        CreateGetLocationsAction();
        browserHistory.replace('/');
    }

    tickAuto(value: string) {
        if (value.length >= 3) {
            // Get suggestions
            CreateGetSuggestionsAction(value);
        } else {
            TrackStore.clearSuggestions();
            this.setState({
                datasource: []
            })
        }
    }

    removeTrack(track: ITrack) {
        CreateRemoveTrackAction(track, this.state.marker.id);
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.dismiss.bind(this)}
            />
        ];

        let listItems = this.state.tracks.map((track, i) => {
            return <ListItem
                    primaryText={track.name}
                    secondaryText={track.artists.join(', ')}
                    onClick={() => this.removeTrack(track)}
                    rightAvatar={<Avatar src={track.album_cover}/>}
                    />
        });

        return (
            <Dialog
                className="yaBoi"
                title={this.state.marker.title}
                open={true}
                modal={false}
                actions={actions}
                autoScrollBodyContent={true}
                onRequestClose={this.dismiss.bind(this)}
            >
                <Autocomplete
                    hintText="Add track to playlist..."
                    filter={Autocomplete.noFilter}
                    dataSource={this.state.datasource}
                    openOnFocus={true}
                    fullWidth={true}
                    maxSearchResults={6}
                    onUpdateInput={this.tickAuto.bind(this)}
                />

                <h2>Tracks in this playlist</h2>
                <List>
                    {listItems}
                </List>
            </Dialog>
        )
    }
}
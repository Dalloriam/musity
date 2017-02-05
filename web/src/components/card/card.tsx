import * as React from "react";

import { browserHistory } from 'react-router';

import { IMarker } from "../location_map/IMarker";

import LocationStore from "../location_store";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

export interface ICardProps {
    params: {
        locId: string
    }
}

export interface ICardState {
    marker: IMarker
}

export class Card extends React.Component<ICardProps, ICardState> {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            marker: LocationStore.getMarkerByKey(this.props.params.locId)
        })
    }

    dismiss(y: boolean) {
        browserHistory.replace('/');
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.dismiss.bind(this)}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.dismiss.bind(this)}
            />
        ];
        return (
            <Dialog
                className="yaBoi"
                title="Edit this location"
                open={true}
                modal={false}
                actions={actions}
                onRequestClose={this.dismiss.bind(this)}
            >
                <h2>{this.state.marker.title}</h2>

                <img className="img-frame" src={this.state.marker.picture}></img>
            </Dialog>
        )
    }
}
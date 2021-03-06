import * as React from "react";

import { browserHistory } from "react-router";

import { IMarker } from "./IMarker";

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import { CreateGetLocationsAction } from "./actions/get_locations";

import LocationStore from "../location_store";

interface IMapProps {};

interface IGmapProps {
    markers: Array<IMarker>;

    onMapLoad: any;

    onMarkerClick: any;
}
interface IMapState {
    markers: Array<IMarker>
};


const GettingStartedGoogleMap = withGoogleMap((props: IGmapProps) => {
    return <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={11}
        defaultCenter={{ lat: 45.5017, lng: -73.5673 }}
    >

    {
        props.markers.map((marker) => (
            <Marker
                {...marker}
                onClick={() => props.onMarkerClick(marker)}
            />
        ))
    }
    </GoogleMap>
});

export class Map extends React.Component<IMapProps, IMapState> {

    constructor() {
        super();

        this.state = {
            markers: LocationStore.getMarkers()
        }

        CreateGetLocationsAction();
    }

    componentWillMount() {
        LocationStore.on("LOCATIONS_RECEIVED", this.getMarkers.bind(this));
    }

    getMarkers(): void {
        this.setState({
            markers: LocationStore.getMarkers()
        })
    }

    handleMarkerClick(marker: IMarker) {
        browserHistory.push(marker.id);
    }

    render() {
        return (
            <GettingStartedGoogleMap
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
                markers={this.state.markers}
                onMarkerClick={this.handleMarkerClick.bind(this)}
            />
        );
    }
}
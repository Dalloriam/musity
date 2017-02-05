import { EventEmitter } from "events";

import dispatcher from "./dispatcher";

import { IMarker } from "./location_map/IMarker";

class LocationStore extends EventEmitter {
    markers: Array<IMarker>;

    constructor() {
        super();

        this.markers = [
            {
                position: {
                        lat: -25.363882,
                        lng: 131.044922
                },
                key: "waddup",
                defaultAnimation: 2
            }
        ];
    }

    getMarkers(): Array<IMarker> {
        return this.markers;
    }

    getMarkerByKey(key: string): IMarker {
        return this.markers.filter((marker) => {
            return marker.key == key;
        })[0]
    }

    handleActions() {

    }
}

const store = new LocationStore();
dispatcher.register(store.handleActions.bind(this));
export default store;
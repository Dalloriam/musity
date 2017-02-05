import { EventEmitter } from "events";

import dispatcher from "./dispatcher";

import { IMarker } from "./location_map/IMarker";

import { IAction } from "./IAction";

import { LocationsReceivedAction } from "./location_map/actions/locations_received";

class LocationStore extends EventEmitter {
    markers: Array<IMarker>;

    constructor() {
        super();

        this.markers = [
        ];
    }

    getMarkers(): Array<IMarker> {
        return this.markers;
    }

    getMarkerByKey(key: string): IMarker {
        return this.markers.filter((marker) => {
            return marker.id == key;
        })[0]
    }

    handleActions(action: IAction): void {
        switch (action.type) {
            case "GET_LOCATIONS":
                break

            case "LOCATIONS_RECEIVED":
                let a = action as LocationsReceivedAction;
                a.markers.forEach((m) => {
                    m.title = m.title? m.title: "Untitled";
                })
                this.markers = a.markers;
                this.emit("LOCATIONS_RECEIVED");
                break
        }
    }
}

const store = new LocationStore();
dispatcher.register(store.handleActions.bind(store));
export default store;
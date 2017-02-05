import { IAction } from "../../IAction";
import dispatcher from "../../dispatcher";

import { IMarker } from "../IMarker";

export class LocationsReceivedAction implements IAction {
    type = "LOCATIONS_RECEIVED";
    markers: Array<IMarker>;

    constructor(markers: Array<IMarker>) {
        this.markers = markers;
    }
}

export function CreateLocationsReceivedAction(markers: Array<IMarker>) {
    dispatcher.dispatch(new LocationsReceivedAction(markers));
}
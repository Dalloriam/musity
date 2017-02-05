import { IAction } from "../../IAction";
import dispatcher from "../../dispatcher";

import { ITrack } from "../ITrack";

export class TrackReceivedAction implements IAction {
    type = "TRACK_RECEIVED";
    track: ITrack;

    constructor(track: ITrack) {
        this.track = track;
    }
}

export function CreateTrackReceivedAction(track: ITrack) {
    dispatcher.dispatch(new TrackReceivedAction(track));
}
import { IAction } from "../../IAction";
import dispatcher from "../../dispatcher";

import { ITrack } from "../ITrack";

export class RemoveTrackAction implements IAction {
    type = "REMOVE_TRACK";
    track: ITrack;

    constructor(track: ITrack) {
        this.track = track;
    }
}

export function CreateRemoveTrackAction(track: ITrack) {
    dispatcher.dispatch(new RemoveTrackAction(track));
}
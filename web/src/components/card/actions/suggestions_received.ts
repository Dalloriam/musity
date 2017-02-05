import { IAction } from "../../IAction";
import dispatcher from "../../dispatcher";

import { ITrack } from "../ITrack";

export class SuggestionsReceivedAction implements IAction {
    type = "SUGGESTIONS_RECEIVED";
    tracks: Array<ITrack>;

    constructor(tracks: Array<ITrack>) {
        this.tracks = tracks;
    }
}

export function CreateSuggestionsReceivedAction(tracks: Array<ITrack>) {
    dispatcher.dispatch(new SuggestionsReceivedAction(tracks));
}
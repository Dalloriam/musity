import { IAction } from "../../IAction";
import dispatcher from "../../dispatcher";

import axios from 'axios';

import * as Config from 'Config';

import { ITrack } from "../ITrack";

export class RemoveTrackAction implements IAction {
    type = "REMOVE_TRACK";
    track: ITrack;

    constructor(track: ITrack) {
        this.track = track;
    }
}

export function CreateRemoveTrackAction(track: ITrack, locID: string) {
    let url = Config.serverUrl + '/locations/' + locID + '/tracks/' + track.id;
    axios.delete(url)
    .then((resp) => {
        dispatcher.dispatch(new RemoveTrackAction(track));
    },
    (err) => {
        console.log("BRUHHHHHH");
    })
}
import { IAction } from "../../IAction";
import dispatcher from "../../dispatcher";

import { ITrack } from "../ITrack";

import { CreateTrackReceivedAction } from './tracks_received';

import axios from "axios";

import * as Config from 'Config';

export class AddTrackAction implements IAction {
    type = "ADD_TRACK";
    track: ITrack;

    constructor(track: ITrack) {
        this.track = track;
    }
}

export class TrackAddedAction implements IAction {
    type = "TRACK_ADDED";
    track: ITrack;

    constructor(track: ITrack) {
        this.track = track;
    }
} 

export function CreateAddTrackAction(track: ITrack, locId: string) {
    dispatcher.dispatch(new AddTrackAction(track));

    let url = Config.serverUrl + '/locations/' + locId + '/tracks';

    axios.post(url, {spotify_id: track.id, spotify_uri: track.uri})
    .then((resp) => {
        console.log(resp);
    },
    (err) => {
        console.log("BRUHHHHHHHH");
    })


    dispatcher.dispatch(new TrackAddedAction(track))
}
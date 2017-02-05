import { IAction } from "../../IAction";
import dispatcher from "../../dispatcher";

import { ITrack } from "../ITrack";

import { CreateTrackReceivedAction } from './tracks_received';

import axios from "axios";

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

export function CreateAddTrackAction(track: ITrack) {
    dispatcher.dispatch(new AddTrackAction(track));
    dispatcher.dispatch(new TrackAddedAction(track))
    // TODO: API Call
}
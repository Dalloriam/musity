import { IAction } from "../../IAction";
import dispatcher from "../../dispatcher";

import { CreateTrackReceivedAction } from "./tracks_received";

import { ITrack } from "../ITrack";

import axios from "axios";

export class GetTracksActions implements IAction {
    type = "GET_TRACKS";
}

export function CreateGetTracksActions(trackIDs: Array<{spotify_uri: string, spotify_id: string}>) {
    dispatcher.dispatch(new GetTracksActions());

    trackIDs.forEach((tData) => {
        let tId = tData.spotify_id;
        let url = "https://api.spotify.com/v1/tracks/" + tId;

        axios.get(url)
        .then((resp) => {
            CreateTrackReceivedAction(resp.data as ITrack);
        },
        (err: Error) => {
            console.log("BRUUHHHHH");
        })
    });
}
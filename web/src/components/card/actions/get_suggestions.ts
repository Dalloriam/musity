import { IAction } from "../../IAction";
import dispatcher from "../../dispatcher";

import { ITrack } from "../ITrack";

import { CreateSuggestionsReceivedAction } from "./suggestions_received";

import axios from "axios";

export class GetSuggestionsAction implements IAction {
    type = "GET_SUGGESTIONS";
}

export function CreateGetSuggestionsAction(query: string) {
    dispatcher.dispatch(new GetSuggestionsAction());
    let url = "https://api.spotify.com/v1/search?q=" + encodeURI(query) + "&type=track";

    axios.get(url)
    .then((resp) => {
        let tracks = resp.data.tracks.items;
        CreateSuggestionsReceivedAction(tracks);
    },
    (err: Error) => {
        console.log("BRUUHHHHH");
    });
}
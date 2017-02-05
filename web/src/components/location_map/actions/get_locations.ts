import { IAction } from "../../IAction";
import { CreateLocationsReceivedAction } from "./locations_received";
import dispatcher from "../../dispatcher";

import axios from "axios";

import * as Config from 'Config';

export class GetLocationsAction implements IAction {
    type = "GET_LOCATIONS";
}

export function CreateGetLocationsAction() {
    dispatcher.dispatch(new GetLocationsAction());

    let url: string = Config.serverUrl + '/locations';

    axios.get(url)
    .then((response) => {
        CreateLocationsReceivedAction(response.data);
    },
    (err: Error) => {
        console.log("BRUHHHHHHHHHHHHHH");
    });
}
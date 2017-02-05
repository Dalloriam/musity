import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

import { ITrack } from './ITrack';

import { IAction } from "../IAction";

import { TrackReceivedAction } from "./actions/tracks_received";
import { SuggestionsReceivedAction } from "./actions/suggestions_received";
import { RemoveTrackAction } from "./actions/remove_track";
import { TrackAddedAction } from './actions/add_track';

class TrackStore extends EventEmitter {
    tracks: Array<ITrack>;
    suggestions: Array<ITrack>;

    constructor() {
        super();

        this.tracks = [];
        this.suggestions = [];
    }

    getTracks(): Array<ITrack> {
        return this.tracks;
    }

    getSuggestions(): Array<ITrack> {
        return this.suggestions;
    }

    clear(): void {
        this.tracks = [];
    }

    clearSuggestions(): void {
        this.suggestions = [];
    }

    private cleanTrack(dirtyTrack: any): ITrack {
        console.log(dirtyTrack)
        let cleanTrack: ITrack = {
            uri: dirtyTrack.uri,
            name: dirtyTrack.name,
            id: dirtyTrack.id,
            artists: dirtyTrack.artists.map((a: any) => a.name),
            album: dirtyTrack.album.name,
            album_cover: dirtyTrack.album.images[0].url
        };

        return cleanTrack;
    }

    handleActions(action: IAction): void {
        switch(action.type) {
            case "TRACK_ADDED":
                let a = action as TrackAddedAction;
                this.tracks.push(a.track);
                this.emit('TRACK_RECEIVED');
                break;

            case "SUGGESTIONS_RECEIVED":
                let act = action as SuggestionsReceivedAction;
                this.suggestions = act.tracks.filter((x) => x !== undefined).map(this.cleanTrack.bind(this)) as ITrack[];
                this.emit('SUGGESTIONS_RECEIVED');
                break;
            
            case "TRACK_RECEIVED":
                let dirtyTrack = (action as TrackReceivedAction).track as any;
                this.tracks.push(this.cleanTrack(dirtyTrack));
                this.emit('TRACK_RECEIVED');
                break;
            
            case "REMOVE_TRACK":
                let trackToRemove = (action as RemoveTrackAction).track;

                this.tracks.filter((t) => t.id == trackToRemove.id).forEach((t) => {
                    let i = this.tracks.indexOf(t);
                    this.tracks.splice(i, 1);
                });
                this.emit('REMOVE_TRACK');
                break;
        }
    }
}

const store = new TrackStore();
dispatcher.register(store.handleActions.bind(store));
export default store;
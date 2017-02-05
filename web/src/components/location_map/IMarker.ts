export interface IMarker {
    picture: string;
    tracks: Array<{spotify_uri: string, spotify_id: string}>;
    artists: string;
    address: string;
    title: string;
    id: string;
    position: {
        lat: number,
        lng: number
    };
}
export interface IMarker {
    picture: string;
    tracks: Array<string>;
    artists: string;
    address: string;
    title: string;
    id: string;
    position: {
        lat: number,
        lng: number
    };
}
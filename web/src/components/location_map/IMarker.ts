export interface IMarker {
    position: {
        lat: number,
        lng: number
    };

    key: string;
    title: string;
    pictureURL: string;
    address: string;

    defaultAnimation: number;
}
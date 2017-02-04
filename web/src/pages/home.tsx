import * as React from "react";

import { Link } from 'react-router';

export interface IHomeProps {}

export interface IHomeState {}

export class Home extends React.Component<IHomeProps, IHomeState> {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h2>Hello, world.</h2>
            </div>
        );
    }
}
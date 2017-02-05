import * as React from "react";

import { Link } from 'react-router';

import { Map } from '../components/location_map';

export interface IHomeProps {
    locId?: string
}

export interface IHomeState {}

require('../sass/body.scss');

export class Home extends React.Component<IHomeProps, IHomeState> {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="panel">
                <Map/>
                { this.props.children }
            </div>
        );
    }
}
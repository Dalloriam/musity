import * as React from "react";
import {Link} from "react-router"


export interface ILayoutProps {}

export interface ILayoutState {
    title?: string,
}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();

        this.state = {
            title: "Musity Dashboard",
        }
    }

    render() {
        return (
            <div>
                <h1>{ this.state.title }</h1>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}
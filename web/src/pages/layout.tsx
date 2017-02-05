import * as React from 'react';
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";
import AppBar from 'material-ui/AppBar';


export interface ILayoutProps {}

export interface ILayoutState {
    title?: string,
}

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "rgba(59, 193, 74, 1)",
    }
});

export class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();

        this.state = {
            title: "Musity Dashboard",
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className={"main-panel"}>
                <AppBar className={"navbar"} title={this.state.title}/>
                    <div className={"content"}>
                        { this.props.children }
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
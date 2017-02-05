import * as React from "react";

import { browserHistory } from 'react-router';

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

export interface ICardProps {
    params: {
        locId: string
    }
}

export interface ICardState {

}

export class Card extends React.Component<ICardProps, ICardState> {

    constructor() {
        super();
    }

    dismiss(y: boolean) {
        console.log('pls');
        browserHistory.replace('/');
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.dismiss.bind(this)}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.dismiss.bind(this)}
            />
        ];
        return (
            <Dialog
                title="Edit this location"
                open={true}
                modal={false}
                actions={actions}
                onRequestClose={this.dismiss.bind(this)}
            >
                <h2>Yao waddup</h2>
            </Dialog>
        )
    }
}
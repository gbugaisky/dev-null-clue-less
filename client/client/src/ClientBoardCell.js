import React, { Component } from 'react';
import './App.css';
class ClientBoardCell extends Component {
    constructor(props) {
        super(props);
        const style = {
            "W":{'backgroundColor': "white"},
            "R":{'backgroundColor': "grey"},
            "B":{'backgroundColor': "black"},
            "H":{'backgroundColor': "brown"}
        }[props.text];
        this.state = {
            color: style,
            player: this.props.player
        };
    }

    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    render() {

        return (
            <td id={this.guid()} width="40px" style={this.state.color} height="40px">
                {this.props.player}
            </td>
        );
    }
}
export default ClientBoardCell;
import React, { Component } from 'react';
import ClientBoardCell from "./ClientBoardCell";
import './App.css';
class ClientBoardRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players
        };
    }

    render() {
        return (
            <td id={this.props.id} className={this.props.type === 'room' ? "BoardRoom" : "Spacer"}>
                <table cellPadding={"0"} cellSpacing={"0"}>
                    <tbody>
                        <tr className="BoardRoomRow">
                            <ClientBoardCell text={this.props.type === 'room' ? "R" : "B"}/>
                            <ClientBoardCell text={this.props.type === 'room' ? "R" : "B"}/>
                            <ClientBoardCell text={this.props.type === 'room' ? "R" : "B"}/>
                        </tr>
                        <tr className="BoardRoomRow">
                            <ClientBoardCell text={this.props.type === 'room' ? "R" : "B"}/>
                            <ClientBoardCell text={this.props.type === 'room' ? "R" : "B"}/>
                            <ClientBoardCell text={this.props.type === 'room' ? "R" : "B"}/>
                        </tr>
                        <tr className="BoardRoomRow">
                            <ClientBoardCell text={this.props.type === 'room' ? "R" : "B"}/>
                            <ClientBoardCell text={this.props.type === 'room' ? "R" : "B"}/>
                            <ClientBoardCell text={this.props.type === 'room' ? "R" : "B"}/>
                        </tr>
                    </tbody>
                </table>
            </td>
        );
    }
}
export default ClientBoardRoom;
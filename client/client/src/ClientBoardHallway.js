import React, { Component } from 'react';
import ClientBoardCell from "./ClientBoardCell";
import './App.css';
class ClientBoardHallway extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: this.props.player
        };
    }
    render() {
        return (
            <td id={this.props.id} className={this.props.orientation === 'vertical' ? "BoardHallwayVertical" : "BoardHallway"}>
                <table cellPadding={"0"} cellSpacing={"0"}>
                    <tbody>
                        <tr className="BoardRoomRow">
                            <ClientBoardCell text={"B"}/>
                            <ClientBoardCell text={this.props.orientation === 'vertical' ? "H" : "B"}/>
                            <ClientBoardCell text={"B"}/>
                        </tr>
                        <tr className="BoardRoomRow">
                            <ClientBoardCell text={this.props.orientation === 'vertical' ? "B" : "H"}/>
                            <ClientBoardCell player={this.props.player} text={"H"}/>
                            <ClientBoardCell text={this.props.orientation === 'vertical' ? "B" : "H"}/>
                        </tr>
                        <tr className="BoardRoomRow">
                            <ClientBoardCell text={"B"}/>
                            <ClientBoardCell text={this.props.orientation === 'vertical' ? "H" : "B"}/>
                            <ClientBoardCell text={"B"}/>
                        </tr>
                    </tbody>
                </table>
            </td>
        );
    }
}
export default ClientBoardHallway;
import React, { Component } from 'react';
import ClientBoard from "./ClientBoard";
import './App.css';
class ClientGame extends Component {
    render() {
        return (
            <div id={"Game"}>
                <ClientBoard/>
                <div id={"gameControls"}>

                </div>
                <div className="gameLog">

                </div>
            </div>
        );
    }
}
export default ClientGame;

import React, { Component } from 'react';
import './App.css';

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inRoom: false,
            roomName: "",
            newRoom: false
        };
    }

    componentDidMount(){
        window.addEventListener('beforeunload', this.componentCleanup);
    }

    componentCleanup(){
        this.leaveRoomMessage(this.state.roomName,this.props.player);
    }

    componentWillUnmount() {
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
    }

    joinRoom(name){
        let needToJoin = true;
        for(const player of this.props.rooms[name].players){
            console.log("current player: "+player);
            if(player.guid === this.props.player.guid){
                console.log("match? "+player.guid + " : "+this.props.player.guid);
                needToJoin = false;
                break;
            }
        }
        if(needToJoin){
            console.log("joining: "+name);
            this.props.joinRoomMessage(name);
        }
        this.setState({inRoom : true, roomName:name, newRoom : false});
    }

    createRoom(){
        let roomName = document.getElementById("roomName").value;
        this.props.createRoomMessage(roomName);
        this.setState({inRoom : true, roomName:roomName, newRoom : false});
    }

    startNewRoom(){
        this.setState({newRoom : true});
    }

    sendRoomMessage(){
        this.props.moveRoomMessage("testy");
    }

    startGame(){
        const players = this.props.rooms[this.state.roomName].players.map( (player) => {
           return player.name;
        });
        this.props.startGame(players);
    }

    leaveRoom(){
        this.props.leaveRoomMessage(this.state.roomName);
        this.setState({inRoom : false, roomName:"", newRoom : false});
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
        console.log(this.props);
        console.log(this.state);
        return (
            <div id={"Lobby"}>

                {this.state.inRoom ?
                    <div>
                        <ul>
                        {this.props.rooms[this.state.roomName].players.map(function (player) {
                            return <li id={"player"+player.guid}>{player.name}</li>
                        })}
                        </ul>
                        <button id={"leaveRoom"} onClick={this.leaveRoom.bind(this)}>leave room</button>
                        <button id={"startGame"} onClick={this.startGame.bind(this)}>Start Game</button>
                    </div>
                    :
                    this.state.newRoom ?
                        <div>
                            <input id={"roomName"}/>
                            <button id={"createRoomButton"} onClick={this.createRoom.bind(this)}>Create Room</button>
                        </div>
                        : <button id={"newRoomButton"} onClick={this.startNewRoom.bind(this)}>New Room</button>
                }
                {this.state.inRoom ? null : Object.keys(this.props.rooms).map(function(roomKey){
                    return <button id={"room"+this.guid()} onClick={this.joinRoom.bind(this,roomKey)} className={"lobbyRoom"}>{roomKey}</button>
                }, this)}
            </div>
        );
    }
}
export default Lobby;

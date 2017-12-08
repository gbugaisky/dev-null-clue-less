import React, { Component } from 'react';
import './App.css';
import ClientGame from "./ClientGame";
import Lobby from "./Lobby";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import SocketIOClient from 'socket.io-client';
import Cookies from 'universal-cookie';

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};


const socket = SocketIOClient('http://localhost:5000');
const cookies = new Cookies();
let player;
if(cookies.get('userId')){
    player = {"name":"play","guid":cookies.get('userId')};
    console.log("returning player: "+player.guid);
}else{
    cookies.set('userId',guid())
    player = {"name":"play","guid":cookies.get('userId')};
    console.log("new player: "+player.guid);
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: {}
        };
    }

    componentCleanup(){
        this.leaveRoomMessage(this.state.roomName,this.props.player);
    }

    componentWillUnmount() {
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.componentCleanup);
        socket.on(`newroom`, data => {
            let newState = this.state.rooms;
            newState[data.name] = {players: [data.player]};
            this.setState({rooms: newState})
        });
        socket.on(`joined`, room => {
            let newState = this.state.rooms;
            newState[room.name].players.push(room.player);
            this.setState({rooms: newState});
        });
        socket.on(`currentRooms`, rooms => {
            let newState = this.state.rooms;
            for(let room in rooms){
                console.log(room);
                newState[rooms[room].roomName] = {players: rooms[room].players};
            }
            this.setState({rooms: newState});
        });
        socket.on('deleteRoom', roomName => {
            let newState = this.state.rooms;
            console.log("deleting room " + roomName);
            delete newState[roomName];
            this.setState({rooms: newState});
        });
        socket.on(`playerLeaving`, leaveRequest => {
            let newState = this.state.rooms;
            console.log("removing player: " + leaveRequest.player.guid);
            let playerIndex = 0;
            for(const player of newState[leaveRequest.room].players){
                if(player.guid === leaveRequest.player.guid){
                    break;
                }
                playerIndex++;
            }
            console.log("index of player: " + playerIndex);
            newState[leaveRequest.room].players.splice(playerIndex,1);
            console.log(newState[leaveRequest.room].players);
            this.setState({rooms: newState});
        });
    }

    startGame(players){
        socket.emit("start", players);
    }

    moveRoomMessage = move => {
        socket.emit("move",move);
    }

    joinRoomMessage = roomId => {
        socket.emit("room",{"name":roomId,"player":player});
        // let newState = this.state.rooms;
        // console.log(newState[roomId].players);
        // newState[roomId].players.push(player);
        // this.setState({rooms: newState});
    }

    createRoomMessage = roomId => {
        socket.emit("room",{"name":roomId,"player":player});
        let newState = this.state.rooms;
        newState[roomId] = {players: [player]};
        this.setState({rooms: newState});
    }

    leaveRoomMessage = roomId => {
        if(this.state.rooms[roomId].players.length === 1) {
            socket.emit("leaveRoom", {"room": roomId, "player": player, "last": true});
        }else{
            socket.emit("leaveRoom", {"room": roomId, "player": player, "last": false});
        }
    }

    render() {
    return (
        <HashRouter>
          <div className="App">
              <div id={"Nav"}>
                <ul>
                    <li><NavLink exact to={"/"}>Lobby</NavLink></li>
                    <li><NavLink exact to={"/game"}>Game</NavLink></li>
                </ul>
              </div>
              <div id={"content"}>
                  <Route exact path={"/"} render={() => (<Lobby player={player} rooms={this.state.rooms} createRoomMessage={this.createRoomMessage}
                                                                moveRoomMessage={this.moveRoomMessage} joinRoomMessage={this.joinRoomMessage}
                                                                leaveRoomMessage={this.leaveRoomMessage} startGame={this.startGame}/>)} />
                  <Route path={"/game"} render={() => (<ClientGame moveRoomMessage={this.moveRoomMessage} joinRoomMessage={this.joinRoomMessage}/>)}/>
              </div>
          </div>
        </HashRouter>
    );
    }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import ClientGame from "./ClientGame";
import Lobby from "./Lobby";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

class App extends Component {
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
                  <Route exact path={"/"} component={Lobby}/>
                  <Route path={"/game"} component={ClientGame}/>
              </div>
          </div>
        </HashRouter>
    );
  }
}

export default App;

"use strict";

import { Server } from "http";
import * as socket from "socket.io";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as helmet from "helmet";
import routes from "./routes";

import {log} from "util";
import { Controller } from "./lib/controller";
import { Data } from "./lib/data";
import { LobbyRoom } from "./lib/loobyRoom";
import {Player} from "./lib/Player";
const data = Data.initialize();

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use("/", routes);

const server = new Server(app);
const io = socket(server);
const rooms: LobbyRoom[] = [];
server.listen(5000);

function checkRoomExists(roomName: string) {
    log("Does " + roomName + " exist");
    for ( const room of rooms) {
        if (room.getRoomName() === roomName) {
            return true;
        }
    }
    return false;
}

function deleteRoom(roomName: string) {
    log("deleting the " + roomName + " room.");
    let index = -1;
    rooms.map( (room: LobbyRoom, step: number) => {
        if (room.getRoomName() === roomName) {
            index = step;
        }
    });
    if (index !== -1) {
        rooms.splice(index, 1);
    }
}

function addPlayerToRoom(roomName: string, player: Player) {
    rooms.map( (room: LobbyRoom) => {
        if (room.getRoomName() === roomName) {
            room.addPlayer(player);
        }
    });
}
function removePlayerFromRoom(roomName: string, player: Player): boolean {
    log("removing player " + player + " from room " + roomName);
    rooms.map( (room: LobbyRoom) => {
        log("room " + roomName + " match " + room.getRoomName());
        if (room.getRoomName() === roomName) {
            room.removePlayer(player);
            log("removing player from room: " + roomName + ". " + room.getPlayers().length + " players left.");
        }
    }, this);
    return false;
}
io.on("connection", (sio) => {
  sio.emit("hello", "Welcome.");
  sio.emit("currentRooms", rooms);
  sio.join("game");
  sio.on("leaveRoom", (leaveRequest) => {
    log("player: " + leaveRequest.player.guid + " leaving room: " + leaveRequest.room);
    if (leaveRequest.last) {
        deleteRoom(leaveRequest.room);
        io.in("game").emit("deleteRoom", leaveRequest.room);
    } else {
        removePlayerFromRoom(leaveRequest.room, new Player(leaveRequest.player.name, leaveRequest.player.guid));
        io.in(leaveRequest.room).emit("playerLeaving", leaveRequest);
    }
    sio.leave(leaveRequest.room);
  });
  sio.on("room", (room) => {
      if (!checkRoomExists(room.name)) {// Room does not exist
          rooms.push(new LobbyRoom(room.name, [new Player(room.player.name, room.player.guid)]));
          log("New room: " + rooms.toString());
          sio.join(room.name);
          io.in("game").emit("newroom", room);
      } else {// Room exists so join it
          log("Adding player to room: " + rooms.toString());
          sio.join(room.name);
          addPlayerToRoom(room.name, new Player(room.player.name, room.player.guid));
          io.in(room.name).emit("joined", room);
      }
      sio.on("move", (move) => {
          // TODO: call move
          io.in(room.name).emit("player move", move);
      });
      sio.on("start", (users) => {
          const returnVal = Controller.setupGame(data, users);
          io.in(room.name).emit("game start", returnVal);
      });
  });
});

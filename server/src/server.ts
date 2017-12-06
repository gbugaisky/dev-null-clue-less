"use strict";

import { Server } from "http";
import * as socket from "socket.io";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as helmet from "helmet";
import routes from "./routes";

import { Controller } from "./lib/controller";
import { Data } from "./lib/data";

const data = Data.initialize();

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use("/", routes);

const server = new Server(app);
const io = socket(server);

server.listen(3000);

io.on("connection", (sio) => {
  sio.emit("hello", "Welcome.");
  sio.on("start", (users) => {
    const returnVal = Controller.setupGame(data, users);
    io.in("game").emit("game start", returnVal);
  });

  sio.on("room", (room) => {
    sio.join(room);

    sio.on("move", (move) => {
      // TODO: call move
      io.in(room).emit("player move", move);
    });
  });
});

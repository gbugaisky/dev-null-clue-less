"use strict";

import { Server } from "http";
import * as socket from "socket.io";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as helmet from "helmet";
import routes from "./routes";

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use("/", routes);

const server = new Server(app);
const io = socket(server);

server.listen(3000);

io.on("connection", (sio) => {
  sio.emit("hello", "Welcome.");
  // sio.on()
});

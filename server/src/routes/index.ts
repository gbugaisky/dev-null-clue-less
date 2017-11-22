"use strict";

// import * as express from "express";
import { Request, Response, Router } from "express";

const routes: any = Router();

routes.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server's working");
});

module.exports = routes;

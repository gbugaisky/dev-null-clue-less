"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as helmet from "helmet";
import routes from "./routes";

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use("/", routes);

app.listen(3000);

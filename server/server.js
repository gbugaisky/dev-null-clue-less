'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes');
const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use('/', routes);

app.listen(3000, () => {});

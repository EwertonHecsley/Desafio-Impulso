const express = require('express');
const rota = require('./router/router');
const app = express();

app.use(express.json());

app.use('/', rota)

module.exports = app;

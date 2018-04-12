const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Initialize the DB Connection.
const dbConnection = require('./app/dao/database/connection');

// Route files.
const indexRoute = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(expressValidator([]));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRoute);

module.exports = app;
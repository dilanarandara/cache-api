const mongoose = require('mongoose');

const config = require('../../configurations');
const logger = require('../../util/logger');

const dbConnectionStr = config.db.connection;

// Connect to the DB.
mongoose.connect(dbConnectionStr);

// List all the mongoose models.
require('../models/cache');

mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open to ' + dbConnectionStr);
});

mongoose.connection.on('error', function (err) {
    logger.error('Mongoose connection error to ' + dbConnectionStr + ' - ' + err);
});

mongoose.connection.on('disconnected', function () {
    logger.warn('Mongoose dis-connected on opening to ' + dbConnectionStr);
});
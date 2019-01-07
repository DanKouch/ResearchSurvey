'use strict';

// Import NPM Modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const winston = require('winston');

const app = express();

// Dot Env Configuration
require('dotenv').config()

const config = {
    port: process.env.PORT || 3030,
    sessionSecret: process.env.SESSION_SECRET
}

// Configure Winston logging
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true, 'colorize': true, 'level': "silly"})

// Configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser(config.sessionSecret));


// Set up public folders
app.use("/", express.static('./bower_components'));
app.use("/", express.static('./public'));

// Configure app
app.set("view engine", "pug");
app.set('views', './app_server/views');

// Start App HTTP server
app.set('port', config.port);

app.listen(app.get('port'), () => {
  winston.info("App HTTP server started on port " + app.get('port'));
});
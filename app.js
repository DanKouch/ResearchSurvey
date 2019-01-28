'use strict';

// Import NPM Modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const winston = require('winston');
const https = require("https");
const fs = require('fs');

const app = express();

// Dot Env Configuration
require('dotenv').config()

// Used for reference
const config = require("./config.js");

// Configure Winston logging
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true, 'colorize': true, 'level': "silly"})

// Configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser(config.sessionSecret));

// Force HTTPS
app.use(function(req, res){
  if(!req.secure){
    res.redirect("https://" + req.headers.host + req.url);
  }
});

// Import local modules
const databaseScript = require("./database.js");

// Sessions
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
  	mongooseConnection: mongoose.connection
  }),
  cookie: {
    maxAge: 31536000000
  },
}));

// Set up public folders
app.use("/", express.static('./bower_components'));
app.use("/", express.static('./public'));

// Configure app
app.set("view engine", "pug");
app.set('views', './app/views');

// Base routing
app.use("/", require("./app/router.js"));
app.get('*', (req, res) => {res.render("error", {title: "404 Error", message: "The page you are looking for does not exist."})})

https.createServer({
  key: fs.readFileSync("./ssl/private_key.key"),
  ca: fs.readFileSync("./ssl/ca.ca-bundle"),
  cert: fs.readFileSync("./ssl/certificate.crt")
}, app).listen(443, () => {
  winston.info("App HTTPS server started on port 443");
});

app.listen(80, () => {
  winston.info("App HTTP server started on port 80");
});
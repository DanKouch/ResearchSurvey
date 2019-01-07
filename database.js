'use strict';

// Require modules
const mongoose = require('mongoose')
const winston = require('winston')
const config = require("./config.js")

mongoose.connect(config.databaseURI).then(
	() => {
		winston.info("Connected to MongoDB server at '" + config.databaseURI + "'");
	},
	err => {
		winston.error("Database Error: " + err)
	}
);

mongoose.connection.on("error", (err) => {
	winston.error("Database Error: " + err)
});

mongoose.connection.on("disconnected", () => {
	winston.warn("Disconnected from mongoose database.");	
});

// Load models
require("./app/models/submissionModel.js");
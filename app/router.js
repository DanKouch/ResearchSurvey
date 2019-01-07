'use strict';

// Modules to setup
const express = require('express')

const surveyController = require("./controllers/surveyController");

var router = express.Router();

router.get('/', (req, res) => {
    res.json({worked: "true"})
    res.status(200)
});

module.exports = router;
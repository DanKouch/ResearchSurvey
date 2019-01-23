'use strict';

// Modules to setup
const express = require('express')

const surveyController = require("./controllers/surveyController");

var router = express.Router();

router.get('/', surveyController.getIntroduction)
router.post('/', surveyController.startSurvey)

router.get('/survey/1', surveyController.getSurvey1)
router.post('/survey/1', surveyController.postSurvey1)

router.get('/polling', surveyController.getPolling)
router.post('/polling', surveyController.postPolling)

router.get('/survey/2', surveyController.getSurvey2)
router.post('/survey/2', surveyController.postSurvey2)

router.get('/survey/3', surveyController.getSurvey3)
router.post('/survey/3', surveyController.postSurvey3)

router.get('/finished', surveyController.getFinished)
router.get('/results', surveyController.getResults)

module.exports = router;
'use strict'

const winston = require('winston')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const sanitizer = require("mongo-sanitize")



let submissionShema = new Schema({
    submittedAt: 			{type : Date, default: Date.now},
    submissionAddress:      {type: String, required: true},
    sessionId:              {type: String, required: true},

    // Demographics
    age:                    {type: Number},
    gender:                 {type: String},

    // Independent Variables
    deceptive:              {type: Boolean, required: true},
    impatient:              {type: Boolean, required: true},
    freindly:               {type: Boolean, required: true},
    quirky:                 {type: Boolean, required: true},

    // Dependent Variables
    votedInPoll:            {type: Boolean},
    trustworthiness:        {type: Number},
    believeVoteWasCounted:  {type: Boolean},
    impatience:             {type: Number},
    deceitfulness:          {type: Number},
    friendliness:           {type: Number},
    additionalPersonalityTraits: {type: String}
})

submissionShema.plugin(sanitizer)

mongoose.model("Submission", submissionShema);
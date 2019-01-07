'use strict'

const winston = require('winston')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sanitizer = require("mongo-sanitize")

let submissionShema = new Schema({
    submittedAt: 			{type : Date, default: Date.now},
    submissionAddress:      {type: String, required: true}
})

submissionShema.plugin(sanitizer)

mongoose.model("Submission", submissionShema);
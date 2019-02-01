const mongoose = require('mongoose');
const winston = require('winston');
const RandomJS = require('random-js');

const submissionModel = mongoose.model("Submission");
var random = new RandomJS(RandomJS.engines.mt19937().autoSeed());

module.exports.getIntroduction = (req, res) => {
    req.session.regenerate(function(err) {
        if(err)
            winston.error("Error regenerating session: " + err)
    })
    res.render("introduction")

    
}

module.exports.getSurvey1 = (req, res) => {
    res.render("survey1")
}

module.exports.getPolling = (req, res) => {
    submissionModel.findOne({'sessionId': req.session.id}).exec((err, submission) => {
        if(err){
            res.render("error", {title: "500 Error", message: "A server error has occoured..." + err})
            winston.error(err)
        }
        if(!submission){
            return res.redirect("/")
        }

        res.render("polling", {
            deceptive: submission.deceptive,
            impatient: submission.impatient,
            freindly: submission.freindly,
            quirky: submission.quirky,
            blockContinue: (req.query.blockContinue == "true")
        })
    })

    
}

module.exports.getSurvey2 = (req, res) => {
    res.render("survey2")
}

module.exports.getFinished = (req, res) => {
    res.render("finished")
}

module.exports.getResults = (req, res) => {
    res.render("results")
}

module.exports.getSurvey3 = (req, res) => {
    res.render("survey3")
}

module.exports.postSurvey2 = (req, res) => {
    submissionModel.findOne({'sessionId': req.session.id}).exec((err, submission) => {
        if(err){
            res.render("error", {title: "500 Error", message: "A server error has occoured..." + err})
            winston.error(err)
        }
        if(!submission){
            return res.redirect("/")
        }

        if(req.body.trustworthiness)
            submission.trustworthiness = req.body.trustworthiness
        if(req.body.believeVoteWasCounted == "Yes" || req.body.believeVoteWasCounted == "No")
            submission.believeVoteWasCounted = req.body.believeVoteWasCounted == "Yes"
        submission.save()

        return res.redirect("/survey/3")
    })
}

module.exports.postSurvey3 = (req, res) => {
    submissionModel.findOne({'sessionId': req.session.id}).exec((err, submission) => {
        if(err){
            res.render("error", {title: "500 Error", message: "A server error has occoured..." + err})
            winston.error(err)
        }
        if(!submission){
            return res.redirect("/")
        }
       
        if(req.body.impatience)
            submission.impatience = req.body.impatience
        if(req.body.deceitfulness)
            submission.deceitfulness = req.body.deceitfulness
        if(req.body.zaniness)
            submission.zaniness = req.body.zaniness
        if(req.body.friendliness)
            submission.friendliness = req.body.friendliness
        if(req.body.additionalPersonalityTraits != "")
            submission.additionalPersonalityTraits = req.body.additionalPersonalityTraits

        submission.save()

        return res.redirect("/finished")
    })
}

module.exports.postSurvey1 = (req, res) => {
    submissionModel.findOne({'sessionId': req.session.id}).exec((err, submission) => {
        if(err){
            res.render("error", {title: "500 Error", message: "A server error has occoured..." + err})
            winston.error(err)
        }
        if(!submission){
            return res.redirect("/")
        }
        
        if(req.body.age)
            submission.age = req.body.age
        if(req.body.gender)
            submission.gender = req.body.gender
        submission.save()

        return res.redirect("/polling")
    })
}

module.exports.postPolling = (req, res) => {
    submissionModel.findOne({'sessionId': req.session.id}).exec((err, submission) => {
        if(err){
            res.render("error", {title: "500 Error", message: "A server error has occoured..." + err})
            winston.error(err)
        }
        if(!submission){
            return res.redirect("/")
        }
        
        submission.votedInPoll = req.body.vote != "Select an Option";
        submission.save()

        return res.redirect("/survey/2")
    })
}

module.exports.startSurvey = (req, res) => {
    submissionModel.create({
        submissionAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        sessionId: req.session.id,
        // Randomly set independent variables
        deceptive: random.bool(),
        impatient: random.bool(),
        freindly: random.bool(),
        quirky: random.bool()
    }, (err, submission) => {
        if(err)
            winston.error("asd " + err)
    })
    return res.redirect("/survey/1");
}
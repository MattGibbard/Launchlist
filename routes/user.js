if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

var User = require('../models/user')

/* GET login route. */
router.get('/login', (req, res) => {
    req.session.destroy()
    res.redirect("/connect/twitter")
})

/* GET manage page. */
router.get('/manage', (req, res) => {
    if (isLoggedIn(req)) {
        // User has signed in, check to see if they are in the database
        User.exists({ twitterid: req.session.grant.response.raw.user_id }).then(exists => {
            // TODO - Need to add a catch here in case the find errors for some reason
            // ? - Can the 'exists' and 'find' below be combined into a single line?
            if (exists) {
                User.find({twitterid: req.session.grant.response.raw.user_id}).exec()
                // TODO - Need to update the above to 'findOne' or check if more than one user was found in the database
                .then(function(result) {
                    // Render the manage template and pass through the session data and tasks from the database
                    res.render("pages/manage", {profile: req.session.grant.response, tasks: result[0].tasks})
                })
                .catch(function(error){
                    // TODO - Implement real logging to log errors correctly
                    console.log(error)
                    res.redirect("/")
                })
            } else {
                const newUser = new User({ twitterid: req.session.grant.response.raw.user_id });
                newUser.save().then(() => {
                    // TODO - Need to add a catch here in case the save action errors
                    res.render("pages/manage", {profile: req.session.grant.response})
                });
            }
        })
    } else {
        res.redirect("/")
    }
})

/* GET manage page. */
router.post('/create', (req, res) => {
    if (isLoggedIn(req)) {
        User.findOneAndUpdate({ twitterid: req.session.grant.response.raw.user_id }, { $push: { tasks: {taskText: req.body.taskText, status: req.body.status}}  }, {useFindAndModify: false},function (error, success) {
                 if (error) {
                     console.log(error);
                 } else {
                     // console.log(success);
                 }
             });
        res.redirect("/manage")
    } else {
        res.redirect("/")
    }
})

/* GET logout route. */
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect("/")
})


/* Function to check to see if the user is logged in */
function isLoggedIn(req) {
    if (typeof req.session.grant !== "undefined" || req.session.grant === true) {
        return true
    } else {
        return false
    }
}

module.exports = router;
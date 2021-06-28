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
    if (typeof req.session.grant !== "undefined" || req.session.grant === true) {
        // User has signed in, check to see if they are in the database
        User.exists({ twitterid: req.session.grant.response.raw.user_id }).then(exists => {
            if (exists) {
                res.render("pages/manage", {profile: req.session.grant.response})
            } else {
                const newUser = new User({ twitterid: req.session.grant.response.raw.user_id });
                newUser.save().then(() => {
                    res.render("pages/manage", {profile: req.session.grant.response})
                });
            }
          })
    } else {
        res.redirect("/")
    }
})

/* GET logout route. */
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

module.exports = router;
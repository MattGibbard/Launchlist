if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Requires
var express = require('express');
var session = require('express-session')
var grant = require('grant').express()

var app = express();

// Globals
let port = process.env.PORT || 8080;

// Express Router
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

// View engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: false}))
app.use(grant(require('./grantConfig')))

app.use('/', indexRouter);
app.use('/', userRouter);

//Listen server
app.listen(port, function() {
    console.log('Server started and listening on port ' + port);
});
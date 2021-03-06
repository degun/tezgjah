// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 3000;

var passport = require('passport');
var flash    = require('connect-flash');

var mysql = require('mysql');

var router = express.Router();

app.use(express.static(__dirname + '/public'));

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ 
	extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// required for passport
app.use(session({
	secret: 'ishmebotintiejaro',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
// launch ======================================================================
app.listen(port);
console.log('Kemi hapur portën ' + port);

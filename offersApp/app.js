'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database
var mongoose = require('mongoose');

// Passport
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    BasicStrategy = require('passport-http').BasicStrategy,
    flash = require('connect-flash');

// Controllers
var routes = require('./routes/index'),
    offers = require('./routes/offers'),
    users = require('./routes/users');

// REST API Controllers
var offers_rest = require('./routes/rest/offers');

// Base path global var
global.__base = __dirname + '/';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize express session before passport
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport config
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new BasicStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Database
var config = require('./config').config();
console.log('Using db : ' + config.db.uri)
mongoose.connect(config.db.uri, config.db.options);

// Controllers
app
  .use('/', routes)
  .use('/offers', offers)
  .use('/users', users);

// REST API Controllers
app
  .use('/rest/offers', offers_rest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

'use strict';

var express = require('express');
var passport = require('passport');

var User = require('../models/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { 
  		title: 'Offers App'
  	});
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res, next) {
    User.register(new User({
        username : req.body.username,
        enabled : true,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email
    }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        } else {
          res.redirect('/login');
        }
    });
});

router.get('/login', function(req, res) {
    res.render('login', {
        user : req.user, 
        message : req.flash('error')
    });
});

router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login', 
    failureFlash: true 
    }), function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/offers');
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;

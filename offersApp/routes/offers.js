'use strict';

var express = require('express'),
	router = express.Router();

var Offer = require('../models/offer');

/* Login Check */
function isAuthenticated(req, res, next) {
    if (req.user)
        return next();
    res.redirect('/login');
}

/* GET Offer list. */
router.get('/', isAuthenticated, function(req, res, next) {
	Offer
	.list({}, function(err, offers) {
  		if (err) {
			res.send(err);
		} else if (offers.length) {
			res.render('offers/list', {
				'title': 'Offers',
				user: req.user,
				'offerList': offers
			});
		} else {
			res.render('offers/list', {
				'title': 'No Offers',
				'offerList': []
			});
		}
	});
});

/* GET New Offer. */
router.get('/new', isAuthenticated, function(req, res, next) {
  	res.render('offers/new', { 
  		title: 'New Offer',
  		user: req.user
  	});
});

/* POST Create Offer. */
router.post('/create', isAuthenticated, function(req, res, next) {
	var offer = new Offer(req.body);
	offer.save(function(err) {
  		if (err) {
			res.send(err);
		} else {
			res.redirect("/offers");
		}
	});
});

/* GET Edit Offer. */
router.get('/edit/:id', isAuthenticated, function(req, res, next) {
	Offer
	.load(req.params.id, function(err, offer) {
  		if (err) {
			res.send(err);
		} else {
			res.render('offers/edit', {
				'title': 'Edit Offer',
				'offer': offer
			});
		}
	});
});

/* POST Update Offer. */
router.post('/:id', isAuthenticated, function(req, res, next) {
	Offer
	.load(req.body.id, function(err, offer) {
  		if (err) {
			res.send(err);
		} else {
			offer.offerdetails = req.body.offerdetails;
			offer.save(function(err) {
  				if (err) {
					res.send(err);
				} else {
					res.redirect("/offers");
				}
			});
		}
	});
});

/* GET Delete Offer. */
router.get('/delete/:id', isAuthenticated, function(req, res, next) {
	Offer
	.load(req.params.id, function(err, offer) {
  		if (err) {
			res.send(err);
		} else {
			offer.remove(function(err) {
  				if (err) {
					res.send(err);
				} else {
					res.redirect("/offers");
				}
			});
		}
	});
});

module.exports = router;

'use strict';

var express = require('express'),
	router = express.Router();

var User = require('../models/user'),
	Offer = require('../models/offer');

/* GET Offer list. */
router.get('/', function(req, res, next) {
	Offer
	.find()
	.populate('user')
	.exec(function(err, offers) {
  		if (err) {
			res.send(err);
		} else if (offers.length) {
			res.render('offers/list', {
				'title': 'Offers',
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
router.get('/new', function(req, res, next) {
  	User.find(function(err, users) {
  		if (err) {

  		} else {
  			res.render('offers/new', { 
  				title: 'New Offer',
  				'userList': users
  			});
  		}
  	});
});

/* POST Create Offer. */
router.post('/create', function(req, res, next) {
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
router.get('/edit/:id', function(req, res, next) {
	Offer
	.findById(req.params.id)
	.populate('user')
	.exec(function(err, offer) {
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
router.post('/:id', function(req, res, next) {
	Offer.findById(req.body.id, function(err, offer) {
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
router.get('/delete/:id', function(req, res, next) {
	Offer.findById(req.params.id, function(err, offer) {
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

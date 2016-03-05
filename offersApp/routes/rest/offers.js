'use strict';

var express = require('express'),
	router = express.Router();

var passport = require('passport');

var User = require('../../models/user'),
	Offer = require('../../models/offer');

/* GET Offer list. */
router.get('/', passport.authenticate('basic', { session: false }), function(req, res, next) {
	Offer
	.find()
	.populate('user')
	.exec(function(err, offers) {
  		if (err) {
			res.send(err);
		} else if (offers.length) {
			res.json(offers);
		} else {
			res.json([]);
		}
	});
});

/* POST Create Offer. */
router.post('/create', passport.authenticate('basic', { session: false }), function(req, res, next) {
	var offer = new Offer(req.body);
	offer.save(function(err, offer) {
  		if (err) {
			res.send(err);
		} else {
			res.json(offer);
		}
	});
});

/* GET Offer. */
router.get('/:id', passport.authenticate('basic', { session: false }), function(req, res, next) {
	Offer
	.findById(req.params.id)
	.populate('user')
	.exec(function(err, offer) {
  		if (err) {
			res.send(err);
		} else {
			res.json(offer);
		}
	});
});

/* PUT Update Offer. */
router.put('/:id', passport.authenticate('basic', { session: false }), function(req, res, next) {
	Offer.findById(req.body.id, function(err, offer) {
  		if (err) {
			res.send(err);
		} else {
			offer.offerdetails = req.body.offerdetails;
			offer.save(function(err, offer) {
  				if (err) {
					res.send(err);
				} else {
					res.json(offer);
				}
			});
		}
	});
});

/* GET Delete Offer. */
router.delete('/:id', passport.authenticate('basic', { session: false }), function(req, res, next) {
	Offer.findById(req.params.id, function(err, offer) {
  		if (err) {
			res.send(err);
		} else {
			offer.remove(function(err) {
  				if (err) {
					res.send(err);
				} else {
					res.json({});
				}
			});
		}
	});
});

module.exports = router;

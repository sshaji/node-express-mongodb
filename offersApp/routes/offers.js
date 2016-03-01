'use strict';

var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');

/* GET Offer list. */
router.get('/', function(req, res, next) {
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/offers";
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to db');
		} else {
			console.log('Connection established');
			var collection = db.collection('offers');
			collection.find({}).toArray(function(err, result) {
				if (err) {
					res.send(err);
				} else if (result.length) {
					res.render('offers/list', {
						'title': 'Offers',
					 	'offerList': result
					});
				} else {
					res.end('No offers');
				}
				db.close();
			})
		}
	})
});

/* GET New Offer. */
router.get('/new', function(req, res, next) {
  res.render('offers/new', { 
  	title: 'New Offer' 
  });
});

/* POST Create Offer. */
router.post('/create', function(req, res, next) {
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/offers";
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to db');
		} else {
			console.log('Connection established');
			var collection = db.collection('offers');
			var offer = req.body;
			collection.insert([offer], function(err, result) {
				if (err) {
					res.send(err);
				} else {
					res.redirect("/offers");
				}
				db.close();
			})
		}
	})
});

/* GET Edit Offer. */
router.get('/edit/:id', function(req, res, next) {
  	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/offers";
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to db');
		} else {
			console.log('Connection established');
			var collection = db.collection('offers');
			var ObjectId = require('mongodb').ObjectID;
			collection.findOne({_id: ObjectId.createFromHexString(req.params.id)}, function(err, result) {
				if (err) {
					res.send(err);
				} else {
					res.render('offers/edit', {
						'title': 'Edit Offer',
					 	'offer': result
					});
				}
				db.close();
			})
		}
	})
});

/* POST Update Offer. */
router.post('/update', function(req, res, next) {
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/offers";
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to db');
		} else {
			console.log('Connection established');
			var collection = db.collection('offers');
			var ObjectId = require('mongodb').ObjectID;
			var offer = req.body;
			collection.update({_id: ObjectId.createFromHexString(offer.id)}, {$set: offer}, function(err, result) {
				if (err) {
					res.send(err);
				} else {
					res.redirect("/offers");
				}
				db.close();
			})
		}
	})
});

/* GET Delete Offer. */
router.get('/delete/:id', function(req, res, next) {
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/offers";
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to db');
		} else {
			console.log('Connection established');
			var collection = db.collection('offers');
			var ObjectId = require('mongodb').ObjectID;
			collection.remove({_id: ObjectId.createFromHexString(req.params.id)}, function(err) {
				if (err) {
					res.send(err);
				} else {
					res.redirect("/offers");
				}
				db.close();
			})
		}
	})
});

module.exports = router;

'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// create a schema
var OfferSchema = new Schema({
  user: { ref : 'User', type : String },
  offerdetails: { type: String }
}, { _id: true });

OfferSchema.path('offerdetails').validate(function (v) {
	return v.length > 3;
}, 'Please enter atleast 3 chars for Offer details');

// make this available to our users in our Node applications
module.exports = mongoose.model('Offer', OfferSchema);;
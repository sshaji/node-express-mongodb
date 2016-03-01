'use strict';

var mongoose = require('mongoose');

// create a schema
var OfferSchema = new mongoose.Schema({
  user: { ref : 'User', type : String },
  offerdetails: { type: String, required: true }
}, { _id: true });

// the schema is useless so far
// we need to create a model using it
var Offer = mongoose.model('Offer', OfferSchema);

// make this available to our users in our Node applications
module.exports = Offer;
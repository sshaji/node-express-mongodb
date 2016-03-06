'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// create a schema
var OfferSchema = new Schema({
  user: { ref : 'User', type : Schema.ObjectId },
  offerdetails: { type: String }
}, { _id: true });

OfferSchema.path('offerdetails').validate(function (v) {
	return v.length > 3;
}, 'Please enter atleast 3 chars for Offer details');

OfferSchema.statics = {
	list: function(options, done) {
		const criteria = options.criteria || {};
    	const page = options.page || 0;
    	const limit = options.limit || 30;
		return this
		.find(criteria)
		.populate('user', 'username firstname lastname')
      	.limit(limit)
      	.skip(limit * page)
      	.cache()
		.exec(done);
	},

	load: function(_id, done) {
		return this
		.findById(_id)
		.populate('user', 'username firstname lastname')
		.cache()
		.exec(done);
	}
};

var cacheOpts = {
	max:50,
	maxAge:1000*60*1,
	debug: true
};
require('mongoose-cache').install(mongoose, cacheOpts);

module.exports = mongoose.model('Offer', OfferSchema);
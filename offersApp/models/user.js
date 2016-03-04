'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

// create a schema
var UserSchema = new Schema({
  enabled: { type: Boolean },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
  _id: { type: String },
  password: { type: String },
  enabled: { type: Boolean },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String }
});

// make this available to our users in our Node applications
module.exports = mongoose.model('User', UserSchema);;
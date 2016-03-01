'use strict';

var mongoose = require('mongoose');

// create a schema
var UserSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enabled: { type: Boolean },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true }
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', UserSchema);

// make this available to our users in our Node applications
module.exports = User;
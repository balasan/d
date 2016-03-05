'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DSchema = new Schema({
  candidates: [{
    name: String,
    size: Number,
    votes: Number,
  }]
});

module.exports = mongoose.model('d', DSchema);

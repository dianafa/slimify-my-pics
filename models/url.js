var mongoose = require('mongoose');

var urlSchema = new mongoose.Schema({
  urlId: { type: Number, index: true },
  address: String,
  testedBefore: { type: Boolean, default: false }
});

module.exports = mongoose.model('Url', urlSchema);
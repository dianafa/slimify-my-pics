var mongoose = require('mongoose');

var urlSchema = new mongoose.Schema({
  urlId: { type: String, unique: true, index: true },
  address: String,
  tests: { type: Number, default: 0 }
});

module.exports = mongoose.model('Url', urlSchema);
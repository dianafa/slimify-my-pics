var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
  testId: { type: Number, unique: true, index: true },
  urlId: { type: Number, default: 0 },
  url: { type: String, default: 'www.google.pl' },
  breakdownImg: { type: Number, default: 0 },
  totalPageSize: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', testSchema);
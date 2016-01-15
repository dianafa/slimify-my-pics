var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
  testId: { type: Number, unique: true, index: true },
  urlId: { type: Number, default: 0 },
  breakdownImg: { type: Number, default: 0 },
  totalPageSize: { type: Number, default: 0 }
});

module.exports = mongoose.model('Test', testSchema);
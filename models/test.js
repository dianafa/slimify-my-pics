var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
  testId: { type: Number, unique: true, index: true },
  urlId: { type: Number, default: 0 },
  breakdown_img: { type: Number, default: 0 },
  total_page_size: { type: Number, default: 0 }
});

module.exports = mongoose.model('Test', testSchema);
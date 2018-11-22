var mongoose = require('mongoose');

var Commodity = mongoose.model('Commodity', {
  identifier: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2,
    trim: true
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {Commodity};

var mongoose = require("mongoose");

var Price = mongoose.model("Price", {
  identifier: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2,
    trim: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = { Price };

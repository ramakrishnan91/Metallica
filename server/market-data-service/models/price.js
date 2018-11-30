var mongoose = require("mongoose");

const Price = mongoose.model("Price", new mongoose.Schema({
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
    trim: true
  },
  price: {
    type: Number,
    required: true
  }
}));

module.exports =  {Price};

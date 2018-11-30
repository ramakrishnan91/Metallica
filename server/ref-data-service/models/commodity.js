var mongoose = require("mongoose");

var commoditySchema = new mongoose.Schema({
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

module.exports = mongoose.model("Commodity", commoditySchema);

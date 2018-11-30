var mongoose = require("mongoose");

var locationSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = mongoose.model("Location", locationSchema);

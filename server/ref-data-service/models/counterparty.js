var mongoose = require("mongoose");

var CounterpartySchema = new mongoose.Schema({
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

module.exports = mongoose.model("Counterparty", CounterpartySchema);

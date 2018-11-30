var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

connection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true
});
autoIncrement.initialize(connection);

var tradeSchema = new mongoose.Schema({
  tradeDate: {
    type: Date,
    required: true
  },
  commodity: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  side: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  counterparty: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  location: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});
tradeSchema.plugin(autoIncrement.plugin, { model: "Trade", field: "id" });

var Trade = connection.model("Trade", tradeSchema);

module.exports = { Trade };

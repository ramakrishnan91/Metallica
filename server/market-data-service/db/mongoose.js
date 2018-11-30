var mongoose = require("mongoose");
const fs = require("fs");

mongoose.Promise = global.Promise;

const {Price} = require("../models/price");
const dummyPrices = JSON.parse(
  fs.readFileSync("./models/dummyPrices.json", "utf8")
);

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log("Sucessfully connected to MongoDB.");
    Price.deleteMany({}, () => {
      for (let index in dummyPrices) {
        let row = dummyPrices[index];
        const price = new Price(row);
        price.save((err, docs) => {
          if (err) {
            console.log(err);
          }
        });
      }
      console.log("Sample Prices are added.");
    });
  });

module.exports = { mongoose };

var mongoose = require("mongoose");
const fs = require("fs");

mongoose.Promise = global.Promise;

const Counterparty = require("../models/counterparty");
const Commodity = require("../models/commodity");
const Location = require("../models/location");

const dummyCommodities = JSON.parse(
  fs.readFileSync("./models/dummy-data/dummyCommodities.json", "utf8")
);
const dummyCounterparties = JSON.parse(
  fs.readFileSync("./models/dummy-data/dummyCounterparties.json", "utf8")
);
const dummyLocations = JSON.parse(
  fs.readFileSync("./models/dummy-data/dummyLocations.json", "utf8")
);

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useMongoClient: true }
  )
  .then(x => {
    console.log("Sucessfully connected to MongoDB.");
    Counterparty.deleteMany({}, () => {
      for (let index in dummyCounterparties) {
        let row = dummyCounterparties[index];
        const counterparty = new Counterparty(row);
        counterparty.save((err, docs) => {
          if (err) {
            console.log(err);
          }
        });
      }
      console.log("Sample Counterparties are added.");
    });

    Commodity.deleteMany({}, () => {
      for (let index in dummyCommodities) {
        let row = dummyCommodities[index];
        const commodity = new Commodity(row);
        commodity.save((err, docs) => {
          if (err) {
            console.log(err);
          }
        });
      }
      console.log("Sample Commodities are added");
    });

    Location.deleteMany({}, () => {
      for (let index in dummyLocations) {
        let row = dummyLocations[index];
        const tradelocation = new Location(row);
        tradelocation.save((err, docs) => {
          if (err) {
            console.log(err);
          }
        });
      }
      console.log("Sample Locations are added");
    });
  });

module.exports = { mongoose };

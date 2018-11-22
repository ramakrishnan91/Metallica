require("../config/config");
const express = require("express");

const { mongoose } = require("../db/mongoose");
const { Commodity } = require("../models/commodity");
const { Counterparty } = require("../models/counterparty");
const { Location } = require("../models/location");

const app = express();
app.get("/commodities", (req, res) => {
  Commodity.find().then(
    docs => {
      res.send(docs);
    },
    err => {
      console.log("unable to get commodities ", err);
    }
  );
  res.send;
});

app.get("/counterparties", (req, res) => {
  Counterparty.find().then(
    docs => {
      res.send(docs);
    },
    err => {
      console.log("unable to get counterparties ", err);
    }
  );
  res.send;
});

app.get("/locations", (req, res) => {
  Location.find().then(
    docs => {
      res.send(docs);
    },
    err => {
      console.log("unable to get locations ", err);
    }
  );
  res.send;
});

app.listen(process.env.PORT, "localhost", () => {
  console.log("listening on port %s", process.env.PORT);
});

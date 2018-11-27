require("../config/config");
const express = require("express");
const request = require("request");

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

app.listen(process.env.PORT, () => {
  const announce = timeout => {
    var options = {
      uri: `http://${process.env.GATEWAY_IP}:${
        process.env.GATEWAY_PORT
      }/register`,
      method: "POST",
      json: { serviceName: "ref-data-service", port: process.env.PORT }
    };
    request(options, (err, res) => {
      if (err) {
        console.log(
          "Failed to register to gateway. Gateway returned error. " + err
        );
      } else {
        console.log("RefDataService registered with gateway.");
      }
    });
  };

  setInterval(announce, 5000);
});

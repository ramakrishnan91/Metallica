require("../config/config");
const express = require("express");
const _ = require("lodash");
const { Trade } = require("../models/trade");
const bodyParser = require("body-parser");
const moment = require("moment");
const request = require("request");

const app = express();
app.use(bodyParser.json());

app.get("/trades", (req, res) => {
  Trade.find().then(
    docs => res.send(_.map(docs, doc => omitFields(doc))),
    err => console.log("unable to get trades ", err)
  );
});

app.post("/trades", (req, res) => {
  var trade = new Trade({
    tradeDate: req.body.tradeDate,
    counterparty: req.body.counterparty,
    side: req.body.side,
    quantity: req.body.quantity,
    price: req.body.price,
    location: req.body.location,
    commodity: req.body.commodity
  });

  trade.save().then(
    doc => {
      res.send(omitFields(doc));
    },
    e => {
      console.log("unable to create trade", e);
      res.status(400).send(e);
    }
  );
});

app.post("/trades/filter", (req, res) => {
  let filter = {};
  if (req.body.startDate && req.body.endDate) {
    var endDate = moment(req.body.endDate).endOf("day");
    filter.tradeDate = { $gte: req.body.startDate, $lt: endDate.toDate() };
  }
  if (req.body.side) {
    filter.side = req.body.side;
  }
  if (req.body.commodities.length > 0) {
    filter.commodity = { $in: req.body.commodities };
  }
  if (req.body.counterparties.length > 0) {
    filter.counterparty = { $in: req.body.counterparties };
  }
  if (req.body.locations.length > 0) {
    filter.location = { $in: req.body.locations };
  }
  Trade.find(filter).then(
    docs => res.send(_.map(docs, doc => omitFields(doc))),
    err => console.log("unable to get trades ", err)
  );
});

app.put("/trades/:id", (req, res) => {
  var id = req.params.id;

  Trade.findOneAndUpdate({ id: id }, { $set: req.body }, { new: true })
    .then(trade => {
      if (!trade) {
        return res.status(404).send();
      }
      res.send(omitFields(trade));
    })
    .catch(e => {
      console.log("unable to update trade", e);
      res.status(400).send();
    });
});

app.delete("/trades/:id", (req, res) => {
  var id = req.params.id;

  Trade.findOneAndDelete({ id: id })
    .then(trade => {
      if (!trade) {
        return res.status(404).send();
      }
      res.send();
    })
    .catch(e => {
      console.log("unable to delete trade", e);
      res.status(400).send();
    });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port %s", process.env.PORT);

  const announce = timeout => {
    request.post(
      `http://${process.env.GATEWAY_IP}:${process.env.GATEWAY_PORT}/register`,
      { json: { serviceName: "trade-service", port: process.env.PORT } },
      (err, res) => {
        if (err) {
          console.log(
            "Failed to register to gateway. Gateway returned error. " + err
          );
        }
      }
    );
  };

  setInterval(announce, 5000);
});

const omitFields = function(doc) {
  return doc.toObject({ transform: (doc, ret) => _.omit(ret, ["_id", "__v"]) });
};

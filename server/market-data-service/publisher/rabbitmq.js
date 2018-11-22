var amqp = require("amqplib/callback_api");
var { Price } = require("../models/price");

const startWorker = () => {
  amqp.connect(
    "amqp://localhost",
    (err, conn) => {
      if (err) {
        console.log("error occured while connecting", err);
      } else {
        conn.createChannel((err, ch) => {
          var exchange = "price";
          ch.assertExchange(exchange, "fanout", { durable: false });
          setInterval(publishPrices, 10000, ch, exchange);
        });
      }
    }
  );
};

const publishPrices = (ch, exchange) => {
  Price.find().then(
    docs => {
      ch.publish(exchange, "", Buffer.from(JSON.stringify(docs)));
      console.log(" [x] Sent %s", docs);
    },
    err => {
      console.log("unable to get prices ", err);
    }
  );
};

module.exports = { startWorker };

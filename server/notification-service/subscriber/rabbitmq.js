var amqp = require("amqplib/callback_api");

var subscribeMsg = io => {
  amqp.connect(
    "amqp://localhost",
    (err, conn) => {
      if (err) {
        console.log("error occured while connecting", err);
      } else {
        conn.createChannel((err, ch) => {
          var exchange = "price";
          ch.assertExchange(exchange, "fanout", { durable: false });
          consumeAndEmitToSocket(ch, exchange, "", io, "LUP");
        });
      }
    }
  );
};

var consumeAndEmitToSocket = function(ch, exchange, queueName, io, eventName) {
  ch.assertQueue(queueName, { exclusive: true }, (err, q) => {
    ch.bindQueue(q.queue, exchange, "");
    ch.consume(
      q.queue,
      msg => {
        msgJSON = JSON.parse(msg.content.toString());
        io.emit(eventName, msgJSON);
      },
      { noAck: true }
    );
  });
};
module.exports = { subscribeMsg };

require("../config/config");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const { subscribeMsg } = require("../subscriber/rabbitmq");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("New client socket created");
  subscribeMsg(io);
});

server.listen(process.env.PORT, () => {
  console.log("App Starting on %s", process.env.PORT);
});

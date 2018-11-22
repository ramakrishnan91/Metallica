import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8002");

const subscribeLatestPrices = callback => {
  socket.on("LUP", lastPrices => callback(lastPrices));
};

export { subscribeLatestPrices };

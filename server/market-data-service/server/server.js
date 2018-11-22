require("../config/config");
var { mongoose } = require("../db/mongoose");
var { startWorker } = require("../publisher/rabbitmq");

startWorker();

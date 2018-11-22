require("../config/config");
var express = require("express");
var app = express();
var httpProxy = require("http-proxy");
var apiProxy = httpProxy.createProxyServer();

var localHost = "http://localhost:";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
  next();
});

app.options("*", (req, res, next) => {
  res.status(200).end();
});

app.all("/trades*", (req, res) => {
  console.log("redirecting to Trade Service Port");
  apiProxy.web(req, res, {
    target: localHost + process.env.TRADE_SERVICE_PORT
  });
});

app.all("/commodities*", (req, res) => {
  console.log("redirecting to Reference Data Service Port");
  apiProxy.web(req, res, {
    target: localHost + process.env.REF_DATA_SERVICE_PORT
  });
});

app.all("/counterparties*", (req, res) => {
  console.log("redirecting to Reference Data Service Port");
  apiProxy.web(req, res, {
    target: localHost + process.env.REF_DATA_SERVICE_PORT
  });
});

app.all("/locations*", (req, res) => {
  console.log("redirecting to Reference Data Service Port");
  apiProxy.web(req, res, {
    target: localHost + process.env.REF_DATA_SERVICE_PORT
  });
});

app.listen(process.env.PORT);

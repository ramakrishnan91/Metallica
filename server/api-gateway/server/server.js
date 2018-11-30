require("../config/config");
var express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var httpProxy = require("http-proxy");
const ServiceRegistry = require("./ServiceRegistry")
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

const serviceRegistry = new ServiceRegistry();
app.post("/register", (req, res, next)=>{
  const serviceName = req.body.serviceName;
  const servicePort = req.body.port;
  const serviceIp = req.connection.remoteAddress.includes('::') ?
      `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;


  serviceRegistry.add(serviceName, serviceIp, servicePort);
  res.json({result: `${serviceName} at ${serviceIp}:${servicePort}`});
})

app.options("*", (req, res, next) => {
  res.status(200).end();
});

app.all("/trades*", (req, res) => {
  const tradeService = serviceRegistry.get("trade-service")
  apiProxy.web(req, res, {
    target: `http://${tradeService.ip}:${tradeService.port}`
  });
});

app.all("/commodities*", (req, res) => {
  const refDataService = serviceRegistry.get("ref-data-service")
  apiProxy.web(req, res, {
    target: `http://${refDataService.ip}:${refDataService.port}`
  });
});

app.all("/counterparties*", (req, res) => {
  const refDataService = serviceRegistry.get("ref-data-service")
  apiProxy.web(req, res, {
    target: `http://${refDataService.ip}:${refDataService.port}`
  });
});

app.all("/locations*", (req, res) => {
  const refDataService = serviceRegistry.get("ref-data-service")
  apiProxy.web(req, res, {
    target: `http://${refDataService.ip}:${refDataService.port}`
  });
});

app.listen(process.env.PORT);

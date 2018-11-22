var env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.PORT = 8000;
}

process.env.TRADE_SERVICE_PORT = 8001;
process.env.REF_DATA_SERVICE_PORT = 8003;

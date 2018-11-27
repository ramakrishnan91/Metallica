var env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.GATEWAY_IP = "localhost";
  process.env.GATEWAY_PORT = 8000;
  process.env.PORT = 8001;
  process.env.MONGODB_URI = "mongodb://localhost:27017/Trade";
}

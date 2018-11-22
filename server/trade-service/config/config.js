var env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.PORT = 8001;
  process.env.MONGODB_URI = "mongodb://localhost:27017/Trade";
}

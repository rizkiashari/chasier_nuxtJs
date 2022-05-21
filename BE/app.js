import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./routes/index.js";
import morgan from "morgan";

const env = dotenv.config().parsed;
var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/", indexRouter);

// Connect to mongodb
mongoose.connect(`${env.MONGODB_URI}${env.MONGODB_HOST}:${env.MONGODB_PORT}`, {
  dbName: env.MONGODB_DB_NAME,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.listen(env.APP_PORT, () => {
  console.log(`Server started on port ${env.APP_PORT}`);
});

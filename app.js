require("dotenv").config();
require("./config/connectMongoose");
require("./config/firebaseAdmin");

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const projectRouter = require("./routes/projects");
const charactersRouter = require("./routes/characters");
const plotsRouter = require("./routes/plots");

const { CLIENT_URL } = require("./config/envConfig");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": CLIENT_URL,
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, Authorization",
    "Access-Control-Allow-Credentials": true,
  });

  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/projects", projectRouter);
app.use("/characters", charactersRouter);
app.use("/plots", plotsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((error, req, res, next) => {
  error.result = "error";
  res.status(error.status || 500);
  res.send(error);
});

module.exports = app;

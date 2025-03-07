/* eslint-disable no-undef */
const express = require("express");
require("express-async-errors");
require("dotenv").config();

const helmet = require("helmet");
const xss = require("xss-clean");

const authenticateUser = require("./middleware/authentication");
const errorHandler = require("./middleware/errorHandler");
const session = require("express-session");
const flash = require('connect-flash');
const app = express();

app.use(helmet());
app.use(xss());

app.use(require("body-parser").urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));


const MongoDBStore = require("connect-mongodb-session")(session);

let mongoURL = process.env.MONGO_URI;
if (process.env.NODE_ENV == "test") {
  mongoURL = process.env.MONGO_URI_TEST;
}

const store = new MongoDBStore({
  uri: mongoURL,
  collection: "mySessions",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);
app.use(flash());

const passport = require("passport");
const passportInit = require("./passport");

passportInit();

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.path == "/multiply") {
    res.set("Content-Type", "application/json");
  } else {
    res.set("Content-Type", "text/html");
  }
  next();
});

app.use("/", require("./routes/root"));
app.use("/sessions", require("./routes/sessionRoutes"));
app.use("/resolution", authenticateUser, require("./routes/resolutions"));

app.get("/multiply", (req, res) => {
  let result = req.query.first * req.query.second;
  if (result.isNaN) {
    result = "NaN";
  } else if (result == null) {
    result = "null";
  }
  res.json({ result: result });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = () => {
  try {
    require("./db/connect")(mongoURL);
    return app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = { app };

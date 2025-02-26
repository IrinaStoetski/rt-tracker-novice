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
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
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

app.use("/", require("./routes/root"));
app.use("/sessions", require("./routes/sessionRoutes"));
app.use("/resolution", authenticateUser, require("./routes/resolutions"));

app.use(errorHandler);
const connectDB = require("./db/connect");

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();

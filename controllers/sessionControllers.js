const User = require("../models/User");

const registerShow = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  res.render("register", { error: "" });
};

const registerDo = async (req, res, next) => {
  if (req.body.password !== req.body.password1) {
    return res.render("register", {
      error: "The passwords entered do not match.",
    });
  }
  try {
    const newUser = await User.create(req.body);

    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/");
    });
  } catch (e) {
    let error = "";

    if (e.constructor.name === "ValidationError") {
      error = "Check fields for validation";
    } else if (e.name === "MongoServerError" && e.code === 11000) {
      error = "MongoServerError: Duplicate key";
    } else {
      error = "Something went wrong, try again";
    }

    return res.render("register", { error });
  }
};

const logoff = (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.status(200).send("OK");
    }
  });
};

const logonShow = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  res.render("logon");
};

module.exports = {
  registerShow,
  registerDo,
  logoff,
  logonShow,
};

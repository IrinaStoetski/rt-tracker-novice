const auth = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/sessions/register");
  }
  next();
};

module.exports = auth;

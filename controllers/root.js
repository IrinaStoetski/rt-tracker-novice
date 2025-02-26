const Resolution = require("../models/resolutions/Resolution");
const resolutionsConfig = require("../config/resolutionsConfig");

const handleRootPage = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const resolutions = await Resolution.find({ createdBy: req.user._id });
      res.render("dashboard", {
        user: req.user,
        resolutions,
        resolutionsConfig,
      });
    } catch (error) {
      console.error("Error fetching resolutions:", error);
      res.render("dashboard", {
        user: req.user,
        resolutions: [],
        resolutionsConfig,
      });
    }
  } else {
    res.redirect("/sessions/register");
  }
};

module.exports = {
  handleRootPage,
};

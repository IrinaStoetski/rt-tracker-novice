const express = require("express");
const router = express.Router();

const {
  getAllResolutions,
  getResolution,
  updateResolution,
  deleteResolution,
  createResolution,
} = require("../controllers/resolutions");

router.route("/").get(getAllResolutions);
router
  .route("/:type")
  .get(getResolution)
  .post(createResolution)
  .patch(updateResolution)
  .delete(deleteResolution);

module.exports = router;

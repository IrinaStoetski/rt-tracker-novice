const express = require("express");
const router = express.Router();
const {handleRootPage} = require("../controllers/root");

router.route("/").get(handleRootPage);

module.exports = router;
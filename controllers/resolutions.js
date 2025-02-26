const Resolution = require("../models/resolutions/Resolution");
const resolutionConfig = require("../config/resolutionsConfig");

const getAllResolutions = async (req, res) => {
  const resolutions = await Resolution.find({
    createdBy: req.user.userId,
  }).sort("createdAt");
  res.status(200).json({ resolutions });
};

const getResolution = async (req, res) => {
  const {
    user: { _id: userId },
    params: { type: resolutionType },
  } = req;

  let resolution = await Resolution.findOne({
    type: resolutionType,
    createdBy: userId,
  });

  if (!resolution) {
    resolution = { type: resolutionType };
  }

  res.render("resolution", { resolutionConfig, resolution });
};

const createResolution = async (req, res) => {
  const resolution = await Resolution.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.render("resolution", { resolution, resolutionConfig });
};

const updateResolution = async (req, res) => {
  const resolution = await Resolution.findOneAndUpdate({
    ...req.body,
    createdBy: req.user._id,
  });

  res.render("resolution", { resolution, resolutionConfig });
};

const deleteResolution = async (req, res) => {
  await Resolution.deleteOne({ type: req.params.type });

  res.status(200).json({ msg: "The entry was deleted." });
};

module.exports = {
  getAllResolutions,
  getResolution,
  updateResolution,
  createResolution,
  deleteResolution,
};

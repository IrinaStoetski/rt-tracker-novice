const mongoose = require("mongoose");

const ResolutionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["loose_weight", "read_books"],
      required: [true, "Please provide type"],
    },
    goal_amount: {
      type: Number,
      required: [true, "Please provide amount"],
    },
    done_amount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["in progress", "to do", "done"],
      default: "to do",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

ResolutionSchema.index({ type: 1, createdBy: 1 }, { unique: true });

module.exports = mongoose.model("Resolution", ResolutionSchema);

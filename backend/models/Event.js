const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["Technical", "Non-Technical", "Hackathon"],
      default: "Technical"
    },
    description: { type: String, default: "", trim: true },
    date: { type: String, default: "", trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

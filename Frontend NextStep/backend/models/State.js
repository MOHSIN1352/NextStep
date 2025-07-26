const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    State_ID: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      primaryKey: true,
    },
    State_Name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", stateSchema);

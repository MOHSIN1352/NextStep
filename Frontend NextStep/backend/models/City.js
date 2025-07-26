const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  City_ID: { type: mongoose.Schema.Types.ObjectId, auto: true },
  City_Name: { type: String, required: true },
  State_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
});

module.exports = mongoose.model("City", citySchema);

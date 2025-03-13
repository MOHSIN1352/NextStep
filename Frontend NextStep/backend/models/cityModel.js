const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    City_ID: { type: mongoose.Schema.Types.ObjectId, auto: true },  // Auto-generated unique ID
    City_Name: { type: String, required: true },
    State_ID: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true }  // Foreign key reference to State model
});

module.exports = mongoose.model("City", citySchema);

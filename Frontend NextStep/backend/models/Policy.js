const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Region: {
    type: mongoose.Schema.Types.ObjectId, // Reference to State collection
    ref: "State",
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  Deadline: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  Year: {
    type: String, // or Number if you want numeric year
    required: true,
  },
  documentLink: {
    type: String,
    unique: true,
  },
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;

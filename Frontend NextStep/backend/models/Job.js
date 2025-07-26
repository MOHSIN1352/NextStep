const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Company_Name: {
    type: String,
    required: true,
  },
  Comapany_Name: {
    type: String,
    required: true,
  },
  Industry_Type: {
    type: String,
    required: true,
  },
  Salary: {
    type: Number,
    required: true,
    min: 0,
  },
  Location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  Apply_Link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Job", jobSchema);

const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const instituteSchema = new mongoose.Schema({
  Institute_ID: {
    type: Number,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  websiteLink: {
    type: String,
    unique: true,
  },
  accreditation: {
    type: String,
    required: true,
  },
  establishment_year: {
    type: Number,
    required: true,
    min: 0,
  },
  degreesOffered: {
    type: [String], // Array of degree names
    required: true,
  },
});

instituteSchema.plugin(AutoIncrement, {
  inc_field: "Institute_ID",
  start_seq: 1,
});

const Institute = mongoose.model("Institute", instituteSchema);

module.exports = Institute;

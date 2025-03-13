const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const hospitalSchema = new mongoose.Schema({
  Hospital_ID: {
    type: Number,
    unique: true
  },
  Name: {
    type: String,
    required: true,
    unique: true
  },
  Longitude: {
    type: String,
    required: true
  },
  Latitude: {
    type: String,
    required: true
  },
  Contact: {
    type: String,
    required: true,
    unique: true
  },
  Location: {
    type: String,
    required: true
  },
  Timings: {
    type: String,
    required: true
  },
  Rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
});

// Apply auto-increment plugin for Hospital_ID
hospitalSchema.plugin(AutoIncrement, { inc_field: "Hospital_ID", start_seq: 1 });

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;

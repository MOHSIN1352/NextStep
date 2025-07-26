const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Facility_Type: {
      type: String,
      enum: ["Hospital", "Pharmacy", "Clinic"],
      required: true,
    },
    Longitude: {
      type: Number,
      required: true,
    },
    Latitude: {
      type: Number,
      required: true,
    },
    Contact: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Invalid phone number format"], // Enforces 10-digit phone numbers
    },
    Location: {
      type: String,
      required: true,
      trim: true,
    },
    Timings: {
      type: String,
      required: true,
      trim: true,
    },
    Rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    City_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
      index: true, // Indexed for faster lookups
    },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;

const mongoose = require("mongoose");

const SavedItemSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    itemType: {
      type: String,
      enum: ["Job", "Course", "Institute", "Policy"],
      required: true,
    },
    savedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  User_ID: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  Name: {
    type: String,
    required: true,
    match: [/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Phone_no: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  City: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  State: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
  Gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  Date_of_Birth: {
    type: Date,
    required: true,
    validate: {
      validator: function (dob) {
        const minDate = new Date("1970-01-01");
        const maxDate = new Date("2010-12-31");
        return dob >= minDate && dob <= maxDate;
      },
      message: "Date of birth must be between 1970 and 2010.",
    },
  },

  password: {
    type: String,
    required: true,
  },
  savedItems: [SavedItemSchema],
});

module.exports = mongoose.model("User", userSchema);

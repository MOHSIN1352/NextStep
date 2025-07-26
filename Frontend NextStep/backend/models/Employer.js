const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const employerSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City", // Reference to City collection
    required: true,
  },
  Average_Salary: {
    type: Number,
    required: true,
    min: 0, // Ensures salary is positive
  },
  Website: {
    type: String,
    unique: true,
  },
});

employerSchema.plugin(AutoIncrement, {
  inc_field: "Employer_ID",
  start_seq: 1,
});

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;

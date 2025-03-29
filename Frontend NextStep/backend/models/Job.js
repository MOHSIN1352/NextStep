const mongoose = require("mongoose");
<<<<<<< HEAD
const AutoIncrement = require("mongoose-sequence")(mongoose);

const jobSchema = new mongoose.Schema({
  Job_ID: {
    type: Number,
    unique: true,
=======

const jobSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
>>>>>>> 34fddd71c486d3faeff856d9eab33113c484ea7f
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
<<<<<<< HEAD
    type: String,
    required: true,
  },
});

jobSchema.plugin(AutoIncrement, { inc_field: "Job_ID", start_seq: 1 });

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
=======
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  }
});

module.exports = mongoose.model("Job", jobSchema);
>>>>>>> 34fddd71c486d3faeff856d9eab33113c484ea7f

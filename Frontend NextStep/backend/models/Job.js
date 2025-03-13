const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const jobSchema = new mongoose.Schema({
  Job_ID: {
    type: Number,
    unique: true
  },
  Employer_ID: {
    type: mongoose.Schema.Types.Number, // Reference to Employer_ID (should also be auto-incremented)
    ref: "Employer",
    required: true
  },
  Title: {
    type: String,
    required: true
  },
  Industry_Type: {
    type: String,
    required: true
  },
  Salary: {
    type: Number,
    required: true,
    min: 0 
  },
  Location: {
    type: String,
    required: true
  }
});

jobSchema.plugin(AutoIncrement, { inc_field: "Job_ID", start_seq: 1 });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
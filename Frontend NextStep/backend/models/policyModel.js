const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const policySchema = new mongoose.Schema({
  Policy_ID: {
    type: Number,
    unique: true
  },
  Name: {
    type: String,
    required: true,
    unique: true
  },
  Description: {
    type: String,
    required: true
  },
  Region: {
    type: String,
    required: true
  },
  Department: {
    type: String,
    required: true
  },
  Deadline: {
    type: String,  // Consider using Date type if you want proper date handling
    required: true
  },
  Status: {
    type: String,
    required: true
  },
  Year: {
    type: String,  // Consider using Number type if you want proper year validation
    required: true
  },
  documentLink: {
    type: String,
    unique: true
  }
});

// Apply auto-increment plugin for Policy_ID
policySchema.plugin(AutoIncrement, { inc_field: "Policy_ID", start_seq: 1 });

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;

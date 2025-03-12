const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const courseSchema = new mongoose.Schema({
  Course_ID: {
    type: Number,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Platform: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  duration: {
    type: String, // Consider using Number if duration is in hours/days
    required: true
  },
  certification: {
    type: Boolean,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
});

// Apply auto-increment plugin for Course_ID
courseSchema.plugin(AutoIncrement, { inc_field: "Course_ID", start_seq: 1 });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

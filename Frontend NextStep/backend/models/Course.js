const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const courseSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Platform: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  duration: {
    type: String,
    required: true,
  },
  certification: {
    type: Boolean,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

courseSchema.plugin(AutoIncrement, { inc_field: "Course_ID", start_seq: 1 });

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

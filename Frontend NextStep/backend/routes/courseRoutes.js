const express = require("express");
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
} = require("../controllers/courseController");

const router = express.Router();

// Course routes
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", updateCourse);

module.exports = router;

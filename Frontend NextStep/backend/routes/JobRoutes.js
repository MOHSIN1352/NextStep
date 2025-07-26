const express = require("express");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
} = require("../controllers/JobController");

const router = express.Router();

// Job routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", createJob);
router.put("/:id", updateJob);

module.exports = router;

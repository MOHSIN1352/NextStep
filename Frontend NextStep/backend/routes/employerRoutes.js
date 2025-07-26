const express = require("express");
const {
  getEmployers,
  getEmployerById,
  createEmployer,
  updateEmployer,
  deleteEmployer,
} = require("../controllers/employerController");

const router = express.Router();

// Employer routes
router.get("/", getEmployers);
router.get("/:id", getEmployerById);
router.post("/", createEmployer);
router.put("/:id", updateEmployer);

module.exports = router;

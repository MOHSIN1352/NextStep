const express = require("express");
const {
  getPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
} = require("../controllers/policyController");

const router = express.Router();

// Routes for Policy model
router.get("/", getPolicies);
router.get("/:id", getPolicyById);
router.post("/", createPolicy);
router.put("/:id", updatePolicy);

module.exports = router;

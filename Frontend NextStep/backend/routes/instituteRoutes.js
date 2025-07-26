const express = require("express");
const {
  getInstitutes,
  getInstituteById,
  createInstitute,
  updateInstitute,
} = require("../controllers/instituteController");

const router = express.Router();

// Institute routes
router.get("/", getInstitutes);
router.get("/:id", getInstituteById);
router.post("/", createInstitute);
router.put("/:id", updateInstitute);

module.exports = router;

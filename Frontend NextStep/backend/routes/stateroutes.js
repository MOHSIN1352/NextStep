const express = require("express");
const {
  getStates,
  createState,
  getStateById,
  updateState,
} = require("../controllers/StateController");

const router = express.Router();

router.get("/all", getStates);
router.post("/", createState);
router.get("/:id", getStateById);
router.put("/:id", updateState);

module.exports = router;

const express = require("express");
const {
  getCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity
} = require("../controllers/cityController");

const router = express.Router();

// City routes
router.get("/", getCities);
router.get("/:id", getCityById);
router.post("/", createCity);
router.put("/:id", updateCity);
router.delete("/:id", deleteCity);

module.exports = router;

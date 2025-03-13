const express = require("express");
const {
  getStates,
  getCities,
  getInstitutes,
  getCourses,
  getHospitals,
  getEmployers,
  getJobs,
  getPolicies
} = require("../controllers/generalController");

const router = express.Router();

// General Routes
router.get("/states", getStates);
router.get("/cities", getCities);
router.get("/institutes", getInstitutes);
router.get("/courses", getCourses);
router.get("/hospitals", getHospitals);
router.get("/employers", getEmployers);
router.get("/jobs", getJobs);
router.get("/policies", getPolicies);

module.exports = router;

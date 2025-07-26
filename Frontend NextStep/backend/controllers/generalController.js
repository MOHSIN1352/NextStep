const State = require("../models/State");
const City = require("../models/City");
const Institute = require("../models/Institute");
const Course = require("../models/Course");
const Hospital = require("../models/Hospital");
const Employer = require("../models/Employer");
const Job = require("../models/Job");
const Policy = require("../models/Policy");

// ✅ Get all states
exports.getStates = async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all cities with state information
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find().populate("State_ID", "State_Name");
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all institutes
exports.getInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find();
    res.json(institutes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all hospitals
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all employers
exports.getEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();
    res.json(employers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all jobs with employer details
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("Employer_ID", "Name Location");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all policies
exports.getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Hospital = require("../models/Hospital");

exports.getHospitals = async (req, res) => {
  try {
    const { location } = req.query;

    let hospitals;
    if (location) {
      hospitals = await Hospital.find({ City_ID: location }).populate({
        path: "City_ID",
        select: "City_Name",
      });
    }

    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createHospital = async (req, res) => {
  try {
    const { Name, Longitude, Latitude, Contact, Location, Timings, Rating } =
      req.body;

    const newHospital = new Hospital({
      Name,
      Longitude,
      Latitude,
      Contact,
      Location,
      Timings,
      Rating,
    });

    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateHospital = async (req, res) => {
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

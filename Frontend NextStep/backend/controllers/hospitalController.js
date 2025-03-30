const Hospital = require("../models/Hospital");

// ✅ Get all hospitals
exports.getHospitals = async (req, res) => {
  try {
    const { location } = req.query;

    let hospitals;
    if (location) {
      hospitals = await Hospital.find({ City_ID: location }).populate({
        path: "City_ID", // Assuming "Region" is a reference to a "State" model
        select: "City_Name", // Select only the state name
      });
    }

    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get a hospital by ID
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

// ✅ Create a new hospital
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

// ✅ Update a hospital by ID
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

// ✅ Delete a hospital by ID
exports.deleteHospital = async (req, res) => {
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);

    if (!deletedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

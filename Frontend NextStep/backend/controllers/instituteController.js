const Institute = require('../models/Institute');

// ✅ Get all institutes
exports.getInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find();
    res.json(institutes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get an institute by ID
exports.getInstituteById = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }
    res.json(institute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create a new institute
exports.createInstitute = async (req, res) => {
  try {
    const { Name, address, websiteLink, accreditation, establishment_year, degreesOffered } = req.body;

    const newInstitute = new Institute({
      Name,
      address,
      websiteLink,
      accreditation,
      establishment_year,
      degreesOffered
    });

    const savedInstitute = await newInstitute.save();
    res.status(201).json(savedInstitute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update an institute by ID
exports.updateInstitute = async (req, res) => {
  try {
    const updatedInstitute = await Institute.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedInstitute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    res.json(updatedInstitute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete an institute by ID
exports.deleteInstitute = async (req, res) => {
  try {
    const deletedInstitute = await Institute.findByIdAndDelete(req.params.id);

    if (!deletedInstitute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    res.json({ message: "Institute deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

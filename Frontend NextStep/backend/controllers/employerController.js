const Employer = require("../models/Employer");

exports.getEmployers = async (req, res) => {
  try {
    const employers = await Employer.find().populate("Location", "City_Name");

    res.json(employers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployerById = async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }
    res.json(employer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEmployer = async (req, res) => {
  try {
    const { Name, Location, Average_Salary, Website } = req.body;

    const newEmployer = new Employer({
      Name,
      Location,
      Average_Salary,
      Website,
    });

    const savedEmployer = await newEmployer.save();
    res.status(201).json(savedEmployer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmployer = async (req, res) => {
  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEmployer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.json(updatedEmployer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

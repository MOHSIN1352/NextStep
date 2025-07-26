const Policy = require("../models/Policy");

exports.getPolicies = async (req, res) => {
  try {
    const { location } = req.query;

    let policies;
    if (location) {
      policies = await Policy.find({ Region: location }).populate({
        path: "Region",
        select: "State_Name",
      });
    }

    res.status(200).json(policies);
  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPolicy = async (req, res) => {
  try {
    const {
      Name,
      Description,
      Region,
      Department,
      Deadline,
      Status,
      Year,
      documentLink,
    } = req.body;

    const newPolicy = new Policy({
      Name,
      Description,
      Region,
      Department,
      Deadline,
      Status,
      Year,
      documentLink,
    });

    const savedPolicy = await newPolicy.save();
    res.status(201).json(savedPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePolicy = async (req, res) => {
  try {
    const updatedPolicy = await Policy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.json(updatedPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

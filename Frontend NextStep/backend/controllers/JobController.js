const Job = require('../models/Job');

// ✅ Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('Employer_ID', 'Name'); // Populate employer name
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get a job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('Employer_ID', 'Name');
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create a new job
exports.createJob = async (req, res) => {
  try {
    const { Employer_ID, Title, Industry_Type, Salary, Location } = req.body;

    const newJob = new Job({
      Employer_ID,
      Title,
      Industry_Type,
      Salary,
      Location
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a job by ID
exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a job by ID
exports.deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

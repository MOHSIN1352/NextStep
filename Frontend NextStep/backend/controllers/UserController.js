const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const nodemailer = require("nodemailer");
const Job = require("../models/Job");
const Course = require("../models/Course");
const Institute = require("../models/Institute");
const Policy = require("../models/Policy");
const ResetToken = require("../models/ResetToken");

exports.registerUser = async (req, res) => {
  try {
    const {
      Name,
      email,
      Phone_no,
      City,
      State,
      Gender,
      Date_of_Birth,
      password,
    } = req.body;

    
    console.log("Receiving Data:", req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 6 characters long and include at least one number and one special character.",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      Name,
      email,
      Phone_no,
      City,
      State,
      Gender,
      Date_of_Birth,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully!",
      token,
      userData: {
        id: newUser._id,
      },
    });
  } catch (error) {
    console.error("Error in user registration:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: messages.join(", ") });
    }

    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .json({ error: ` ${duplicateField} already exists ` });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!user.password) {
      return res
        .status(500)
        .json({ message: "Password is missing in the database." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      userData: {
        id: user._id,
        State: user.State,
        City: user.City,
      },
    });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate("State").populate("City");

    if (!user._id) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { state, city } = req.body;

    if (!state || !city) {
      return res.status(400).json({ message: "State and City are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.State = state;
    user.City = city;

    await user.save();

    const updatedUser = await User.findById(userId)
      .populate("State")
      .populate("City");

    res.status(200).json({
      message: "User profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// SaveController.js
exports.toggleSave = async (req, res) => {
  const { userId, itemId, itemType } = req.body;

  const user = await User.findById(userId);

  const index = user.savedItems.findIndex(
    (item) => item.itemId.toString() === itemId && item.itemType === itemType
  );

  if (index !== -1) {
    // remove from saved
    user.savedItems.splice(index, 1);
    await user.save();
    return res.json({ saved: false });
  } else {
    // add to saved
    user.savedItems.push({ itemId, itemType });
    await user.save();
    return res.json({ saved: true });
  }
};

exports.getSavedItemsDetailed = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const savedItems = user.savedItems;

    const groups = savedItems.reduce((acc, { itemId, itemType }) => {
      if (!acc[itemType]) acc[itemType] = [];
      acc[itemType].push(itemId);
      return acc;
    }, {});

    const [jobs, courses, institutes, policies] = await Promise.all([
      groups.Job ? Job.find({ _id: { $in: groups.Job } }) : [],
      groups.Course ? Course.find({ _id: { $in: groups.Course } }) : [],
      groups.Institute
        ? Institute.find({ _id: { $in: groups.Institute } })
        : [],
      groups.Policy ? Policy.find({ _id: { $in: groups.Policy } }) : [],
    ]);

    return res.json({
      jobs,
      courses,
      institutes,
      policies,
    });
  } catch (error) {
    console.error("Error fetching saved items:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

exports.getRecommendations = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    const savedItems = user.savedItems || [];

    const jobsIds = savedItems
      .filter((item) => item.itemType === "Job")
      .map((item) => item.itemId);
    const coursesIds = savedItems
      .filter((item) => item.itemType === "Course")
      .map((item) => item.itemId);
    const instituteIds = savedItems
      .filter((item) => item.itemType === "Institute")
      .map((item) => item.itemId);
    const policyIds = savedItems
      .filter((item) => item.itemType === "Policy")
      .map((item) => item.itemId);

    const savedJobs = await Job.find({ _id: { $in: jobsIds } });
    const savedCourses = await Course.find({ _id: { $in: coursesIds } });
    const savedInstitutes = await Institute.find({
      _id: { $in: instituteIds },
    });
    const savedPolicies = await Policy.find({ _id: { $in: policyIds } });

    // === Jobs: Recommend based on Company_Name ===
    const companyNames = savedJobs.map((job) => job.Company_Name);
    const recommendedJobs = await Job.find({
      Company_Name: { $in: companyNames },
      _id: { $nin: jobsIds },
    }).limit(10);

    // === Courses: Recommend based on Category ===
    const categories = savedCourses.map((course) => course.Category);
    const recommendedCourses = await Course.find({
      Category: { $in: categories },
      _id: { $nin: coursesIds },
    }).limit(10);

    // === Institutes: Recommend based on degreesOffered ===
    const degreeSet = new Set();
    savedInstitutes.forEach((inst) =>
      inst.degreesOffered?.forEach((deg) => degreeSet.add(deg))
    );
    const recommendedInstitutes = await Institute.find({
      degreesOffered: { $in: [...degreeSet] },
      _id: { $nin: instituteIds },
    }).limit(10);

    // === Policies: Recommend based on Region ===
    const regions = savedPolicies.map((policy) => policy.Region);
    const recommendedPolicies = await Policy.find({
      Region: { $in: regions },
      _id: { $nin: policyIds },
    })
      .populate("Region")
      .limit(10);

    res.status(200).json({
      jobs: recommendedJobs,
      courses: recommendedCourses,
      institutes: recommendedInstitutes,
      policies: recommendedPolicies,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "Error fetching recommendations", error });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(200)
      .json({ message: "If the email exists, a reset link will be sent." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await ResetToken.deleteMany({ userId: user._id, used: false });

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

  const token = new ResetToken({ userId: user._id, otp, expiresAt });
  await token.save();

  const transporter = nodemailer.createTransport({
    /* your SMTP config */
    service: "gmail",
    auth: {
      user: "aarushigoel2003@gmail.com",
      pass: "bbekkcyixuuyvgpp",
    },
  });

  await transporter.sendMail({
    from: "no-reply@yourapp.com",
    to: email,
    subject: "Password Reset",
    html: `<p>Your OTP is <b>${otp}</b>. It is valid for 15 minutes.</p>`,
  });

  res.json({ message: "Reset link sent to email." });
};

exports.resetPasswordWithOTP = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid email" });

  const token = await ResetToken.findOne({
    userId: user._id,
    otp,
    used: false,
    expiresAt: { $gt: new Date() },
  });

  if (!token) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const saltRounds = 10;
  user.password = await bcrypt.hash(newPassword, saltRounds);

  await user.save();

  token.used = true;
  await token.save();

  res.json({ message: "Password reset successfully!" });
};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

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

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      Name,
      email,
      Phone_no,
      City,
      State,
      Gender,
      Date_of_Birth,
      password: hashedPassword, // Store hashed password
    });

    await newUser.save();

    // Generate JWT Token
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

    // Generate JWT Token
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
    const userId = req.params.userId; // Assuming user ID is stored in req.user after authentication

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

    // Ensure field names match schema
    user.state = state;
    user.city = city;

    await user.save();

    // Only populate if state and city are references
    const updatedUser = await User.findById(userId)
      .populate("State") // Only if state is a reference
      .populate("City"); // Only if city is a reference

    res.status(200).json({
      message: "User profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

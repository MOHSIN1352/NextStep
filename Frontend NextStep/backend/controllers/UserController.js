const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import your User model

exports.registerUser = async (req, res) => {
 
  
  try {
   
   
    const { Name, email, Phone_no, City, State, Gender, Date_of_Birth, password } = req.body;
    console.log("Receiving Data:", req.body);
    // Validate all fields
    // if (!Name || !email || !Phone_no || !City || !State || !Gender || !Date_of_Birth || !password) {
    //   return res.status(400).json({ error: "All fields are required." });
    // }

    // Check if the user already exists
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
      { userId: newUser._id, email: newUser.email }, // Payload
      process.env.JWT_SECRET, // Secret key (ensure it's in your .env file)
      { expiresIn: "7d" } // Token expiry (7 days)
    );

    res.status(201).json({
      message: "User registered successfully!",
      token, // Send the token in the response
      user: {
        id: newUser._id,
        name: newUser.Name,
        email: newUser.email,
      }
    });

  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log("Login User", req.body);
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Ensure the user has a password stored
    if (!user.password) {
      return res.status(500).json({ message: "Password is missing in the database." });
    }

    // Compare the password with the hashed one
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.Name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).populate('City State');

  if (user) {
    res.json({
      _id: user.id,
      Name: user.Name,
      email: user.email,
      Phone_no: user.Phone_no,
      City: user.City,
      State: user.State,
      Gender: user.Gender,
      Date_of_Birth: user.Date_of_Birth
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

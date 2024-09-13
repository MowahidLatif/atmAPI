const bcrypt = require("bcrypt");
const User = require("../models/User");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a new user (Register user)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Form data received:", req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
};

exports.infoUser = async (req, res) => {
  try {
    // Assuming you have user authentication and can get user ID from req.user
    const userId = req.user.id;

    // Fetch user details
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found.",
      });
    }

    // Fetch user's accounts
    const accounts = await Account.find({ user: userId });

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        accounts: accounts, // Ensure this is an array
      },
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

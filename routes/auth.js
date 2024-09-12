const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user and save to the database
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    // Send a success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;

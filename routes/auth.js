const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// User login
// router.post("/login", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await User.findOne({ name });
//     if (!user) {
//       return res.status(401).json({ error: "Authentication failed" });
//     }
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: "Authentication failed" });
//     }
//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });

module.exports = router;

const bcrypt = require("bcrypt");
const User = require("../models/User");

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

// Get all users
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({
//       success: true,
//       data: users,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

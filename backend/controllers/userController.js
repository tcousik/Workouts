const User = require("../models/userModel");

// Login
const loginUser = async (req, res) => {
  res.json({ msg: "User login" });
};

// Signup
const signupUser = async (req, res) => {
  res.json({ msg: "User signup" });
};

module.exports = { loginUser, signupUser };

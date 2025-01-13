const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (user) => {
  try {
    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Email already exists");
    }
    throw new Error("Failed to register user: " + error.message);
  }
};

exports.login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email doesn't exist");
    }
    if (!user || !(await user.matchPassword(password))) {
      throw new Error("Invalid credentials");
    }
    const role = user.role;
    const accessToken = generateToken(user.email);
    const refreshToken = generateRefreshToken(user.email);

    return { role, accessToken, refreshToken };
  } catch (error) {
    throw new Error("Failed to login: " + error.message);
  }
};

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const generateRefreshToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });
};
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (user) => {
  try {
    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    console.error("UserService.register:", error);
    throw error;
  }
};

exports.login = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      throw new Error("Invalid credentials");
    }
    const accessToken = generateToken(user.username);
    const refreshToken = generateRefreshToken(user.username);

    return { user, accessToken, refreshToken };
  } catch (error) {
    console.error("UserService.login:", error);
    throw error;
  }
};

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const generateRefreshToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });
};

exports.decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET).username;
};

exports.verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    
    return decoded.username;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

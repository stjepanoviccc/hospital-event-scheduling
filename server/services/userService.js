const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.findById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error("Error while fetching user by id: " + error.message);
  }
};

exports.findByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error("Error while fetcing user by email: " + error.message);
  }
};

exports.findUserFromToken = async (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded?.email) {
      throw new Error("Email not found in token");
    }
    return await exports.findByEmail(decoded.email);
  } catch (error) {
    throw new Error(
      "Invalid token or error in fetching user: " + error.message
    );
  }
};

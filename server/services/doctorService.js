const User = require("../models/User");
const UserRole = require("../models/enums/UserRole");

exports.findAllDoctors = async () => {
  try {
    return await User.find({ role: UserRole.DOCTOR }).select("_id firstName lastName email");
  } catch (error) {
    throw new Error("Failed to find doctors: " + error.message);
  }
};

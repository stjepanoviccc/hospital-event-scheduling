const UserRole = require("../models/enums/UserRole");
const validator = require("validator");

const registerValidationMiddleware = (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName) {
    return res.status(400).json({ error: "First name is required" });
  }

  if (!lastName) {
    return res.status(400).json({ error: "Last name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }

  if (!Object.values(UserRole).includes(role)) {
    return res.status(400).json({ error: `Role must be one of: ${Object.values(UserRole).join(", ")}` });
  }

  next();
};

module.exports = registerValidationMiddleware;

const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { role, accessToken, refreshToken } = await authService.login(
      email,
      password
    );
    res.status(200).json({ role, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
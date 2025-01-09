const userService = require("../services/userService");

exports.findUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

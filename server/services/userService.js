const User = require("../models/User");

exports.findById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        console.error("UserService.findById:", error);
        throw error;
    }
}


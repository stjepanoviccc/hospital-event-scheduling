const User = require("../models/User");

exports.findById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        throw new Error("Error while fetching user by id " + error.message);
    }
}


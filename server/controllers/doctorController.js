const doctorService = require("../services/doctorService");

exports.findAllDoctors = async (req, res, next) => {
  try {
    const doctors = await doctorService.findAllDoctors();
    res.status(200).json({ doctors });
  } catch (error) {
    next(error);
  }
};
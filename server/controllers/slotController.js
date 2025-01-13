const slotService = require("../services/slotService");
const userService = require("../services/userService");

exports.findSlotsByDoctorIdAndByDate = async (req, res, next) => {
  try {
    const { doctorId, date } = req.params;
    const slots = await slotService.findSlotsByDoctorIdAndByDate(doctorId, date);
    res.status(200).json({ slots });
  } catch (error) {
    next(error);
  }
};

exports.findAllSlotsByDoctor = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const doctor = await userService.findUserFromToken(token);
    const slots = await slotService.findAllSlotsByDoctor(doctor._id);
    res.status(200).json({slots})
  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const doctor = await userService.findUserFromToken(token);
    const { startTime, endTime } = req.body;
    const newSlot = await slotService.createSlot(doctor, startTime, endTime);
    res.status(201).json(newSlot);
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { slotId, status } = req.body;
    const updatedSlot = await slotService.updateSlot(slotId, status);
    res.status(200).json({ slot: updatedSlot });
  } catch (error) {
    next(error);
  }
};
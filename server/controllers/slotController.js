const slotService = require("../services/slotService");

exports.findAvailableSlots = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const slots = await slotService.findAvailableSlots(doctorId);
    res.status(200).json({ slots });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { doctorId, startTime, endTime } = req.body;
    const newSlot = await slotService.createSlot(doctorId, startTime, endTime);
    res.status(201).json({ slot: newSlot });
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
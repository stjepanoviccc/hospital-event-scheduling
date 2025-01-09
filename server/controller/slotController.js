const slotService = require("../services/slotService");

exports.findAvailableSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const slots = await slotService.findAvailableSlots(doctorId);
    if (!slots || slots.length === 0) {
      return res.status(404).json({ error: "No available slots found for this doctor" });
    }
    res.status(200).json({ slots });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { doctorId, startTime, endTime } = req.body;
    const newSlot = await slotService.createSlot(doctorId, startTime, endTime);
    res.status(201).json({ slot: newSlot });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { slotId, status } = req.body;
    const updatedSlot = await slotService.updateSlot(slotId, status);
    res.status(200).json({ slot: updatedSlot });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

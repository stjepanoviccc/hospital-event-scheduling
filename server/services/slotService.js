const Slot = require('../models/Slot');

exports.findAvailableSlots = async (doctorId) => {
  try {
    return await Slot.find({ doctor: doctorId, status: 'FREE' });
  } catch (error) {
    console.error("SlotService.findAvailableSlots:", error);
    throw error;
  }
};

exports.createSlot = async (doctorId, startTime, endTime) => {
  try {
    const newSlot = new Slot({ doctor: doctorId, startTime, endTime });
    return await newSlot.save();
  } catch (error) {
    console.error("SlotService.createSlot:", error);
    throw error;
  }
};

exports.updateSlot = async (slotId, status, session = null) => {
    try {
      const updateOptions = session ? { session } : {};
      return await Slot.findByIdAndUpdate(slotId, { status }, updateOptions);
    } catch (error) {
      console.error("SlotService.updateSlot:", error);
      throw error;
    }
  };


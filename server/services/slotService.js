const Slot = require("../models/Slot");
const SlotStatus = require("../models/enums/SlotStatus"); 

exports.findAvailableSlots = async (doctorId) => {
  try {
    return await Slot.find({ doctor: doctorId, status: SlotStatus.FREE});
  } catch (error) {
    throw new Error("Failed to find available slots: " + error.message);
  }
};

exports.createSlot = async (doctorId, startTime, endTime) => {
  try {
    const newSlot = new Slot({ doctor: doctorId, startTime, endTime });
    return await newSlot.save();
  } catch (error) {
    throw new Error("Failed to create slot: " + error.message);
  }
};

exports.updateSlot = async (slotId, status, session = null) => {
  try {
    const updateOptions = session ? { session } : {};
    return await Slot.findByIdAndUpdate(slotId, { status }, updateOptions);
  } catch (error) {
    throw new Error("Failed to update slot: " + error.message);
  }
};

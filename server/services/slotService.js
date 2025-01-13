const Slot = require("../models/Slot");
const SlotStatus = require("../models/enums/SlotStatus"); 
const UserRole = require("../models/enums/UserRole");

exports.findById = async (id) => {
  try {
    return await Slot.findById(id);
  } catch (error) {
    throw new Error("Failed to find slot by id: " + error.message);
  }
};

exports.findSlotsByDoctorIdAndByDate = async (doctorId, date) => {
  try {
    const parsedDate = new Date(date);
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0)); 
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    const slots = await Slot.find({
      doctor: doctorId,
      startTime: { $gte: startOfDay, $lt: endOfDay }
    })
      .select("_id startTime endTime status")
      .sort({ startTime: 1 });

    const availableSlots = slots.filter(slot => slot.status === 'FREE');
    const bookedSlots = slots.filter(slot => slot.status === 'BOOKED');

    return {
      availableSlots,
      bookedSlots
    };
  } catch (error) {
    throw new Error("Failed to find slots by status for specific doctor: " + error.message);
  }
};

exports.findAllSlotsByDoctor = async (doctorId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const slots = await Slot.
      find({ doctor: doctorId, startTime: { $gte: today }})
      .select("startTime endTime status")
      .populate("doctor").select("_id")
      .sort({ startTime: 1 });
    return slots;
  } catch (error) {
    throw new Error("Failed to find slots for specific doctor: " + error.message);
  }
}

exports.createSlot = async (doctor, startTime, endTime) => {
  try {
    if(doctor.role != UserRole.DOCTOR) {
      throw new Error("You are not a doctor.");
    }

    const overlappingSlot = await Slot.findOne({
      doctor: doctor._id,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      ]
    });

    if (overlappingSlot) {
      throw new Error("There is already a slot for this doctor in the selected time range.");
    }

    const newSlot = new Slot({ doctor: doctor._id, startTime, endTime, status: SlotStatus.FREE });
    return await newSlot.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateSlot = async (slotId, status) => {
  try {
    return await Slot.findByIdAndUpdate(slotId, { status });
  } catch (error) {
    throw new Error("Slot is already reserved!");
  }
};

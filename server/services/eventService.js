const Event = require("../models/Event");
const SlotService = require("./SlotService");

exports.findById = async (id) => {
  try {
    return await Event.findById(id);
  } catch (error) {
    console.error("EventService.findById:", error);
    throw error;
  }
};

exports.findEventsByPatient = async (patientId) => {
  try {
    return await Event.find({ patient: patientId }).populate("slot");
  } catch (error) {
    console.error("EventService.findEventsByPatient:", error);
    throw error;
  }
};

exports.findEventsByDoctor = async (doctorId) => {
  try {
    return await Event.find()
      .populate({ path: "slot", match: { doctor: doctorId } })
      .populate("patient")
      .exec();
  } catch (error) {
    console.error("EventService.findEventsByDoctor:", error);
    throw error;
  }
};

exports.createEvent = async (slotId, patientId) => {
  try {
    const newEvent = new Event({
      slot: slotId,
      patient: patientId,
      status: "PENDING",
    });
    return await newEvent.save();
  } catch (error) {
    console.error("EventService.createEvent:", error);
    throw error;
  }
};

exports.updateEventStatus = async (eventId, status) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const event = await Event.findById(eventId).session(session);
    if (status === "APPROVED") {
      await SlotService.updateSlot(event.slot, "BOOKED", session);
    }
    await Event.findByIdAndUpdate(eventId, { status }, { session });
    await session.commitTransaction();
    return await Event.findById(eventId);
  } catch (error) {
    await session.abortTransaction();
    console.error("EventService.updateEventStatus:", error);
    throw error;
  } finally {
    session.endSession();
  }
};

const Event = require("../models/Event");
const SlotService = require("./slotService");
const EventStatus = require("../models/enums/EventStatus");
const SlotStatus = require("../models/enums/SlotStatus");

exports.findById = async (id) => {
  try {
    return await Event.findById(id);
  } catch (error) {
    throw new Error("Failed to find event by id: " + error.message);
  }
};

exports.findEventsByPatient = async (patientId) => {
  try {
    return await Event.find({ patient: patientId }).populate("slot");
  } catch (error) {
    throw new Error("Failed to find events by patient: " + error.message);
  }
};

exports.findEventsByPatientAndByStatusPending = async (patientId) => {
  try {
    return await Event.find({patient: patientId, status: EventStatus.PENDING })
      .populate("slot")
      .populate("doctor")
      .exec();
  } catch (error) {
    throw new Error("Failed to find events by patient and by status PENDING: " + error.message);
  }
}

exports.findEventsByDoctor = async (doctorId) => {
  try {
    return await Event.find({ doctor: doctorId})
      .populate("slot")
      .populate("patient")
      .exec();
  } catch (error) {
    throw new Error("Failed to find events by doctor: " + error.message);
  }
};

exports.createEvent = async (slotId, patientId) => {
  try {
    const slot = await Slot.findById(slotId).session(session);
    if (slot.status === SlotStatus.BOOKED) {
      throw new Error("This slot is already booked by another patient.");
    }
    const newEvent = new Event({
      slot: slotId,
      patient: patientId,
      status: EventStatus.PENDING,
    });
    return await newEvent.save();
  } catch (error) {
    throw new Error("Failed to create event: " + error.message);
  }
};

exports.updateEventStatus = async (eventId, status) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const event = await Event.findById(eventId).session(session);
    if (status === EventStatus.APPROVED) {
      const slot = await Slot.findById(event.slot).session(session);
      if (slot.status === SlotStatus.BOOKED) {
        throw new Error("Slot is already booked by another patient.");
      }
      await SlotService.updateSlot(event.slot, SlotStatus.BOOKED, session);
      await Event.updateMany(
        { slot: event.slot, status: EventStatus.PENDING },
        { $set: { status: EventStatus.REJECTED } },
        { session }
      );
    }
    await Event.findByIdAndUpdate(eventId, { status }, { session });
    await session.commitTransaction();
    return await Event.findById(eventId);
  } catch (error) {
    await session.abortTransaction();
    throw new Error("Failed to update event status: " + error.message);
  } finally {
    session.endSession();
  }
};

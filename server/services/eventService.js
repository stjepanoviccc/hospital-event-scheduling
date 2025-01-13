const Event = require("../models/Event");
const slotService = require("./slotService");
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
    const events = await Event.find({ patient: patientId})
      .select("status")
      .populate({path: "slot", select: "startTime endTime doctor", populate: { path: "doctor", select: "_id email firstName lastName" }})
      .sort({ "slot.startTime": 1 })  
      .exec();

    const result = {
      PENDING: events.filter((event) => event.status === EventStatus.PENDING) || [],
      APPROVED: events.filter((event) => event.status === EventStatus.APPROVED) || [],
      REJECTED: events.filter((event) => event.status === EventStatus.REJECTED) || [],
    };
    
    return result;
  } catch (error) {
    throw new Error("Failed to find events by patient: " + error.message);
  }
};

exports.findEventsByDoctor = async (doctorId) => {
  try {
    let slots = await slotService.findAllSlotsByDoctor(doctorId);
    const slotIds = slots.map(slot => slot._id);

    let events = await Event.find({ "slot": { $in: slotIds }, "status": { $ne: "REJECTED" } })
      .populate("slot", "startTime endTime status")
      .populate("patient", "firstName lastName")

    return events;
  } catch (error) {
    throw new Error("Failed to find events by doctor: " + error.message);
  }
};


exports.createEvent = async (slotId, patientId) => {
  try {
    const slot = await slotService.findById(slotId);

    if (slot.status === SlotStatus.BOOKED) {
      throw new Error("This slot is already booked.");
    }
    const existingEvent = await Event.findOne({ slot: slotId, patient: patientId });
    if (existingEvent) {
      if (existingEvent.status == EventStatus.REJECTED) {
        throw new Error("You are rejected.")
      }
      throw new Error("You already sent request for this slot. Please be patient and wait for the answer.");
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
  try {
    const event = await Event.findById(eventId);
    const slot = await slotService.findById(event.slot._id);
    if (status === EventStatus.APPROVED) {
      if (slot.status === SlotStatus.BOOKED) {
        throw new Error("Slot is already booked by another patient.");
      }
      await slotService.updateSlot(event.slot, SlotStatus.BOOKED);
      await Event.updateMany(
        { slot: event.slot, status: EventStatus.PENDING },
        { $set: { status: EventStatus.REJECTED } }
      );
    }
    await Event.findByIdAndUpdate(eventId, { status, doctor: slot.doctor });

    return await Event.findById(eventId)
    .select("status")
    .populate("slot").select("_id")
    .populate("doctor").select("_id, firstName, lastName, email")
  } catch (error) {
    throw new Error("Failed to update event status: " + error.message);
  } 
};

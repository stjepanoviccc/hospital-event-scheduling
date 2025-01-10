const eventService = require("../services/eventService");

exports.findEventById = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await eventService.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ event });
  } catch (error) {
    next(error);
  }
};

exports.findEventsByPatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const events = await eventService.findEventsByPatient(patientId);
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};

exports.findEventsByDoctor = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const events = await eventService.findEventsByDoctor(doctorId);
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { slotId, patientId } = req.body;
    const newEvent = await eventService.create(slotId, patientId);
    res.status(201).json({ event: newEvent });
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { eventId, status } = req.body;
    const updatedEvent = await eventService.updateEventStatus(eventId, status);
    res.status(200).json({ event: updatedEvent });
  } catch (error) {
    next(error);
  }
};
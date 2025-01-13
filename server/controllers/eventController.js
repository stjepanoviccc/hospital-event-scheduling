const userService = require("../services/userService");
const eventService = require("../services/eventService");
const UserRole = require("../models/enums/UserRole");

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

exports.findEventsByRole = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = await userService.findUserFromToken(token);
    let events;
    if(user.role === UserRole.DOCTOR) {
      events = await eventService.findEventsByDoctor(user._id);
    } else if(user.role === UserRole.PATIENT) {
      events = await eventService.findEventsByPatient(user._id);
    }
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { slotId } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const patient = await userService.findUserFromToken(token);
    const newEvent = await eventService.createEvent(slotId, patient._id);
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
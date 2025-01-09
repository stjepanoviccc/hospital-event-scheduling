const eventService = require("../services/eventService");

exports.findEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await eventService.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.findEventsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const events = await eventService.findEventsByPatient(patientId);
    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ error: "No events found for this patient" });
    }
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.findEventsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const events = await eventService.findEventsByDoctor(doctorId);
    if (!events || events.length === 0) {
      return res.status(404).json({ error: "No events found for this doctor" });
    }
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { slotId, patientId } = req.body;
    const newEvent = await eventService.create(slotId, patientId);
    res.status(201).json({ event: newEvent });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { eventId, status } = req.body;
    const updatedEvent = await eventService.updateEventStatus(eventId, status);
    res.status(200).json({ event: updatedEvent });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

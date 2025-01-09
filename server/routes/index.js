const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const eventController = require("../controllers/eventController");
const slotController = require("../controllers/slotController");
const { protect } = require("../middleware/authMiddleware");

const route = express.Router();
const API_V1 = "/api/v1";
const AUTH = "/auth";
const USERS = "/users";
const EVENTS = "/events";
const SLOTS = "/slots";

// auth
route.post(`${API_V1}${AUTH}/login`, authController.login);
route.post(`${API_V1}${AUTH}/register`, authController.register);

// user
route.get(`${API_V1}${USERS}/:userId`, userController.findUserById);

// event
route.get(`${API_V1}${EVENTS}/:eventId`, protect(), eventController.findEventById
);
route.get(`${API_V1}${EVENTS}/patient/:patientId`, protect(),eventController.findEventsByPatient
);
route.get(`${API_V1}${EVENTS}/doctor/:doctorId`, protect(), eventController.findEventsByDoctor);
route.post(`${API_V1}${EVENTS}`, protect(), eventController.create);
route.put(`${API_V1}${EVENTS}`, protect(), eventController.updateStatus);

// slot
route.get(
  `${API_V1}${SLOTS}/doctor/:doctorId`, protect(), slotController.findAvailableSlots
);
route.post(`${API_V1}${SLOTS}`, protect(), slotController.create);
route.put(`${API_V1}${SLOTS}`, protect(), slotController.updateStatus);

module.exports = route;

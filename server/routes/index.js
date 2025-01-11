const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const eventController = require("../controllers/eventController");
const slotController = require("../controllers/slotController");
const authMiddleware = require("../middleware/authMiddleware");
const eventValidationMiddleware = require("../middleware/eventValidationMiddleware");
const loginValidationMiddleware = require("../middleware/loginValidationMiddleware");
const registerValidationMiddleware = require("../middleware/registerValidationMiddleware");
const slotValidationMiddleware = require("../middleware/slotValidationMiddleware");
const UserRole = require("../models/enums/UserRole");

const route = express.Router();
const { PATIENT, DOCTOR } = UserRole;

// auth
route.post(`/auth/login`, loginValidationMiddleware, authController.login);
route.post(`/auth/register`, registerValidationMiddleware, authController.register);

// user
// route.get(`/users/:userId`, authMiddleware(), userController.findUserById);

// event
route.get(`/events/:eventId`, authMiddleware([DOCTOR, PATIENT]
), eventController.findEventById);
route.get(`/events/patient/:patientId`, authMiddleware([PATIENT]),eventController.findEventsByPatient);
route.get(`/events/doctor/:doctorId`, authMiddleware([DOCTOR]), eventController.findEventsByDoctor);
route.post(`/events`, authMiddleware([PATIENT]), eventValidationMiddleware, eventController.create);
route.put(`/events`, authMiddleware([DOCTOR]), eventValidationMiddleware, eventController.updateStatus);

// slot
route.get(`/slots/doctor/:doctorId`, authMiddleware([DOCTOR, PATIENT]), slotController.findAvailableSlots);
route.post(`/slots`, authMiddleware([DOCTOR]
), slotValidationMiddleware, slotController.create);
route.put(`/slots`, authMiddleware([DOCTOR]), slotValidationMiddleware, slotController.updateStatus);

module.exports = route;

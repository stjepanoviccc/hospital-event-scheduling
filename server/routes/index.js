const express = require("express");
const authController = require("../controllers/authController");
const doctorController = require("../controllers/doctorController");
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

// doctor
route.get(`/doctors`, authMiddleware([PATIENT]), doctorController.findAllDoctors);

// event
route.get(`/events/:eventId`, authMiddleware([DOCTOR, PATIENT]), eventController.findEventById);
route.get(`/events`, authMiddleware([DOCTOR, PATIENT]),eventController.findEventsByRole);
route.post(`/events`, authMiddleware([PATIENT]), eventController.create);
route.put(`/events`, authMiddleware([DOCTOR]), eventValidationMiddleware, eventController.updateStatus);

// slot
route.get(`/slots`, authMiddleware([DOCTOR]), slotController.findAllSlotsByDoctor);
route.get(`/slots/doctors/:doctorId/date/:date`, authMiddleware([PATIENT]), slotController.findSlotsByDoctorIdAndByDate);
route.post(`/slots`, authMiddleware([DOCTOR]), slotValidationMiddleware, slotController.create);
route.put(`/slots`, authMiddleware([DOCTOR]), slotValidationMiddleware, slotController.updateStatus);

module.exports = route;

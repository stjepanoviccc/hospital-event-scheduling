const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const eventController = require("../controllers/eventController");
const slotController = require("../controllers/slotController");
const rbacMiddleware = require("../middleware/rbacMiddleware");
const eventValidationMiddleware = require("../middleware/eventValidationMiddleware");
const registerValidationMiddleware = require("../middleware/registerValidationMiddleware");
const slotValidationMiddleware = require("../middleware/slotValidationMiddleware");
const UserRole = require("../models/enums/UserRole");

const route = express.Router();
const { PATIENT, DOCTOR } = UserRole;

// auth
route.post(`/auth/login`, authController.login);
route.post(`/auth/register`, registerValidationMiddleware, authController.register);

// user
// route.get(`/users/:userId`, rbacMiddleware(), userController.findUserById);

// event
route.get(`/events/:eventId`, rbacMiddleware([DOCTOR, PATIENT]
), eventController.findEventById);
route.get(`/events/patient/:patientId`, rbacMiddleware([PATIENT]),eventController.findEventsByPatient);
route.get(`/events/doctor/:doctorId`, rbacMiddleware([DOCTOR]), eventController.findEventsByDoctor);
route.post(`/events`, rbacMiddleware([PATIENT]), eventValidationMiddleware, eventController.create);
route.put(`/events`, rbacMiddleware([DOCTOR]), eventValidationMiddleware, eventController.updateStatus);

// slot
route.get(`/slots/doctor/:doctorId`, rbacMiddleware([DOCTOR, PATIENT]), slotController.findAvailableSlots);
route.post(`/slots`, rbacMiddleware([DOCTOR]
), slotValidationMiddleware, slotController.create);
route.put(`/slots`, rbacMiddleware([DOCTOR]), slotValidationMiddleware, slotController.updateStatus);

module.exports = route;

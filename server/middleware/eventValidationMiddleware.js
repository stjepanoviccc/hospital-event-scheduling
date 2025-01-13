const EventStatus = require("../models/enums/EventStatus");

const eventValidationMiddleware = (req, res, next) => {
  const { slotId, patient, status } = req.body;

  if (slotId && !mongoose.Types.ObjectId.isValid(slotId)) {
    return res.status(400).json({ error: "Slot is required" });
  }

  if (status && !Object.values(EventStatus).includes(status)) {
    return res.status(400).json({
      error: `Status must be one of: ${Object.values(EventStatus).join(", ")}`,
    });
  }

  if (patient && !mongoose.Types.ObjectId.isValid(patient)) {
    return res.status(400).json({ error: "Invalid patient ID" });
  }

  next();
};

module.exports = eventValidationMiddleware;

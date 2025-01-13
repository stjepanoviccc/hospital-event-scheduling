const SlotStatus = require("../models/enums/SlotStatus");

const slotValidationMiddleware = (req, res, next) => {
  const { doctor, startTime, endTime, status } = req.body;

  if (!startTime || isNaN(Date.parse(startTime))) {
    return res.status(400).json({ error: "Valid start time is required" });
  }

  if (!endTime || isNaN(Date.parse(endTime))) {
    return res.status(400).json({ error: "Valid end time is required" });
  }

  if (new Date(startTime) >= new Date(endTime)) {
    return res.status(400).json({ error: "End time must be after start time" });
  }

  if (status && !Object.values(SlotStatus).includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${Object.values(SlotStatus).join(", ")}` });
  }

  next();
};

module.exports = slotValidationMiddleware;

const mongoose = require("mongoose");
const EventStatus = require("./enums/EventStatus");

const EventSchema = new mongoose.Schema({
  slot: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, 
  status: {
    type: String,
    enum: Object.values(EventStatus),
    default: EventStatus.PENDING,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);

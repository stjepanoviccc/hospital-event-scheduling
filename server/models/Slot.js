const mongoose = require("mongoose");
const { SlotStatus } = require("./enums/SlotStatus");

const SlotSchema = new mongoose.Schema({
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    startTime: {type:Date, required: true},
    endTime: {type:Date, required: true},
    status: {
        type: String,
        enum: Object.values(SlotStatus),
        default: SlotStatus.FREE
    }
});

module.exports = mongoose.model('Slot', SlotSchema);
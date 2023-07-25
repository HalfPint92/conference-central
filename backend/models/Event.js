// Schema for events
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  clickCount: { type: Number, default: 0 }, // field to store the click count
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;

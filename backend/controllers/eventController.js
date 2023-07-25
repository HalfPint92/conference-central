const Event = require("../models/Event");

// Function to get all events
const getEvents = async (req, res) => {
  try {
    // Find all events in the database
    const events = await Event.find();

    // Respond with the array of events
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get an event by its ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the event by its ID in the database
    const event = await Event.findById(id);
    console.log("Fetched Event:", event);

    // If the event with the specified ID does not exist, respond with an error message
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Respond with the event object
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to update the click count of an event
const updateClickCount = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the event by its ID and update the clickCount field by incrementing it by 1
    const event = await Event.findByIdAndUpdate(
      id,
      { $inc: { clickCount: 1 } }, // $inc is a MongoDB update operator that increments the specified field
      { new: true } // Return the updated event in the response
    );

    // If the event with the specified ID does not exist, respond with an error message
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Respond with a success message and the updated event object
    res
      .status(200)
      .json({ message: "Click count updated successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    // Create a new Event instance with the provided data
    const newEvent = new Event({ title, description, date, location });

    // Save the new event to the database
    await newEvent.save();

    // Respond with a success message and the newly created event object
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to update an existing event by its ID
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, location } = req.body;

    // Find the event by its ID and update its fields with the provided data
    const event = await Event.findByIdAndUpdate(
      id,
      { title, description, date, location },
      { new: true } // Return the updated event in the response
    );

    // If the event with the specified ID does not exist, respond with an error message
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Respond with a success message and the updated event object
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to delete an event by its ID
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the event by its ID and delete it from the database
    const event = await Event.findByIdAndDelete(id);

    // If the event with the specified ID does not exist, respond with an error message
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  updateClickCount,
};

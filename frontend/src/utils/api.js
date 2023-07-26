const BASE_URL = "http://localhost:5000/api";

// Function to fetch all events
export const getEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch events");
  }
};

// Function to fetch a specific event by ID
export const getEventById = async (eventId) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch event");
  }
};

// Function to create a new event
export const createEvent = async (event, token) => {
  try {
    const response = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to create event");
  }
};

// Function to update an existing event
export const updateEvent = async (eventId, event, token) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to update event");
  }
};

// Function to delete an event
export const deleteEvent = async (eventId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to delete event");
  }
};

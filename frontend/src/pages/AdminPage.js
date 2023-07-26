import React, { useState, useEffect } from "react";
import EventDetails from "../components/EventDetails";
import axios from "axios";
import "../pagecss/AdminPage.css";

const AdminPage = () => {
  // State variables
  const [events, setEvents] = useState([]); // Stores the list of events
  const [newEvent, setNewEvent] = useState({
    // Stores the data of the new event being created
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [editingEventId, setEditingEventId] = useState(""); // Stores the ID of the event being edited
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // This useEffect runs once on component mount.
    const checkAdminAccess = async () => {
      try {
        // Check if the user is an admin by accessing the 'role' stored in localStorage.
        const role = localStorage.getItem("role");
        if (role === "admin") {
          // If the user is an admin, fetch the events.
          fetchEvents();
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkAdminAccess(); // Call the function to check for admin access.
  }, []);

  const isAdmin = () => {
    // Function to check if the user is an admin based on the 'role' stored in localStorage.
    return localStorage.getItem("role") === "admin";
  };

  const fetchEvents = async () => {
    // Function to fetch events from the server.
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data); // Update the 'events' state with the fetched data.
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e, eventId) => {
    // Function to handle input changes when editing an event.
    const { name, value } = e.target;
    if (name === "date") {
      // If the input name is 'date', format the date and update the 'events' state with the new date.
      const formattedDate = value.split("T")[0]; // Extract the date part
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, [name]: formattedDate } : event
        )
      );
    } else {
      // If the input name is not 'date', update the 'events' state with the new value.
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, [name]: value } : event
        )
      );
    }
  };

  const handleCreateEvent = async (e) => {
    // Function to handle the creation of a new event.
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/events", newEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchEvents(); // Fetch events again after the new event is created.
      setNewEvent({
        // Reset the 'newEvent' state to clear the form.
        title: "",
        description: "",
        date: "",
        location: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditEvent = (eventId) => {
    // Function to set the 'editingEventId' state when editing an event.
    setEditingEventId(eventId);
  };

  const handleUpdateEvent = async (eventId) => {
    // Function to handle the update of an edited event.
    try {
      const updatedEvent = events.find((event) => event._id === eventId);
      await axios.put(
        `http://localhost:5000/api/events/${eventId}`,
        updatedEvent,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the authentication token in the request headers.
          },
        }
      );
      fetchEvents(); // Fetch events again after the event is updated.
      setEditingEventId(""); // Reset the 'editingEventId' state to exit the edit mode.
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    // Function to handle the deletion of an event.
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchEvents(); // Fetch events again after the event is deleted.
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAdmin()) {
    // If the user is not an admin, display an access denied message.
    return <p>Access denied. Only admins can view this page.</p>;
  }

  // If the user is an admin, render the AdminPage component.
  return (
    <div>
      {/* Form to create a new event */}
      <div className="admin-page">
        <div className="create-event-container">
          <h2>Create Event</h2>
          <form onSubmit={handleCreateEvent} className="create-event-form">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="Title"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                placeholder="Description"
              />
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                placeholder="Location"
              />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
      {/* List of events */}
      <div className="events">
        <div className="event-list">
          {events.map((event) => (
            <div key={event._id} className="event">
              {editingEventId === event._id ? (
                <div className="edit-form">
                  {/* Editing form for the event */}
                  <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={(e) => handleInputChange(e, event._id)}
                  />
                  <textarea
                    name="description"
                    value={event.description}
                    onChange={(e) => handleInputChange(e, event._id)}
                  />
                  <input
                    type="date"
                    name="date"
                    value={event.date}
                    onChange={(e) => handleInputChange(e, event._id)}
                  />
                  <input
                    type="text"
                    name="location"
                    value={event.location}
                    onChange={(e) => handleInputChange(e, event._id)}
                  />
                  <button
                    className="save-button"
                    onClick={() => handleUpdateEvent(event._id)}
                  >
                    Save
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setEditingEventId("")}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  {/* Display event information */}
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>Date: {event.date.split("T")[0]}</p>
                  <p>Location: {event.location}</p>
                  <p>Click Count: {event.clickCount}</p>{" "}
                  {/* Display the click count here */}
                  {!editingEventId && (
                    <>
                      <button
                        className="edit-button"
                        onClick={() => handleEditEvent(event._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

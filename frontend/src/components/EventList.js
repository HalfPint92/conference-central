import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../componentcss/EventList.css';

const EventList = () => {
  // Define a state variable to store the list of events fetched from the server.
  const [events, setEvents] = useState([]);

  // useEffect hook is used to fetch the events from the server when the component is mounted.
  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to fetch the list of events from the server using axios.
  const fetchEvents = async () => {
    try {
      // Send a GET request to the server to fetch the events data.
      const response = await axios.get('http://localhost:5000/api/events');

      // Update the state with the fetched events data received from the server.
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle updating the click count for a specific event.
  const handleUpdateClickCount = async (event) => {
    try {
      // Send a PUT request to the server to update the click count for the specified event.
      await axios.put(`http://localhost:5000/api/events/click/${event._id}`);

      // Log a success message to the console.
      console.log('Click count updated successfully');

      // After updating the click count, fetch the events data again to get the updated list of events.
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to render the list of events in the UI.
  const renderEvents = () => {
    return events.map((event) => (
      <div key={event._id} className="event">
        <h3>{event.title}</h3>
        <p>{event.description.slice(0, 50)}</p>
        {/* Render a "Read More" button that calls handleUpdateClickCount when clicked */}
        <button onClick={() => handleUpdateClickCount(event)}>Read More</button>
      </div>
    ));
  };

  // The EventList component renders a list of events fetched from the server.
  return (
    <div>
      <h2>Events</h2>
      <div className="event-grid">{renderEvents()}</div>
    </div>
  );
};

export default EventList;

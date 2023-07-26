import React from 'react';

// Component for the event details
const EventDetails = ({ event }) => {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date.split('T')[0]}</p>
      <p>Location: {event.location}</p>
      <p>Click Count: {event.clickCount}</p> {/* Display the click count */}
    </div>
  );
};

export default EventDetails;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../pagecss/HomePage.css";

const HomePage = () => {
  // State variables
  const [events, setEvents] = useState([]); // Stores the list of events
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Indicates if the user is logged in
  const navigate = useNavigate(); // Get the navigate function from useNavigate hook

  useEffect(() => {
    // This useEffect runs once on component mount.
    fetchEvents(); // Fetch events from the server.
    checkLoggedIn(); // Check if the user is logged in.
  }, []);

  const fetchEvents = async () => {
    // Function to fetch events from the server.
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data); // Update the 'events' state with the fetched data.
    } catch (error) {
      console.error(error);
    }
  };

  const checkLoggedIn = () => {
    // Function to check if the user is logged in based on the presence of a token in localStorage.
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Update the 'isLoggedIn' state to true.
    }
  };

  const Event = ({ event }) => {
    // Nested component to render each event in the event list.
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
      // Function to toggle the 'expanded' state for showing additional event details.
      setExpanded((prevExpanded) => !prevExpanded);
    };

    const handleReadMore = async () => {
      // Function to handle the "Read More" button click.
      if (isLoggedIn) {
        // If the user is logged in, toggle the 'expanded' state to show/hide additional event details.
        toggleExpanded();
        // Send a PUT request to update the click count of the event.
        try {
          await axios.put(
            `http://localhost:5000/api/events/click/${event._id}`
          );
        } catch (error) {
          console.error("Error updating click count:", error);
        }
      } else {
        // If the user is not logged in, redirect to the login page.
        window.location.href = "/login";
      }
    };

    return (
      // Render the event details with a "Read More" button.
      <div key={event._id} className="event">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        {expanded && (
          // Display additional event details if 'expanded' is true.
          <>
            <p>Date: {event.date.split("T")[0]}</p>
            <p>Location: {event.location}</p>
          </>
        )}
        <button className="read-more-button" onClick={handleReadMore}>
          {expanded ? "Read less" : "Read more"}
        </button>
      </div>
    );
  };

  const handleGalleryClick = () => {
    // Function to handle the "Gallery" button click.
    // Redirect to the GalleryPage using the navigate function.
    navigate("/gallery");
  };

  const renderEvents = () => {
    // Function to render the list of events using the Event component.
    return events.map((event) => <Event key={event._id} event={event} />);
  };

  return (
    <div>
      <div className="venue-info">
        <h1>About the Venue</h1>
        <div className="centered">
          <p>
            Welcome to Conference Central! We organize various events throughout
            the year. Lorem ipsum dolor sit amet. Et mollitia veniam in magni
            quas quo recusandae harum est laborum molestiae. Ut tempore
            aspernatur ut cupiditate quas est omnis fuga in quam nihil? Rem
            tenetur amet sit voluptatem minus et omnis quos est dolor molestias
            et soluta numquam ea officia dolor. Ut iste totam vel consequatur
            aspernatur non sunt quas. Qui aspernatur veritatis qui omnis
            repellat nam alias tempore qui accusantium laborum.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="side-panel">
          <h2>Contact events@concen.com to book:</h2>
          <ul>
            <li>Weddings</li>
            <li>Functions</li>
            <li>Ceremonies</li>
            <li>Parties</li>
          </ul>
          <button className="gallery-button" onClick={handleGalleryClick}>
            Gallery
          </button>
        </div>
        <div className="content-wrapper">
          <div className="event-list">
            <div className="event-grid">{renderEvents()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

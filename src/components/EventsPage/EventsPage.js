// Import the necessary components, including React, the Event component, and the EventsPage.css file.
import React from 'react';
import Event from "./Event.js";
import "./EventsPage.css";

// Create an EventsPage component that receives the events data and a handleLogout function as props.
const EventsPage = ({events, handleLogout}) => {
  // Render the component, which displays a list of events using the Event component.
  return (
    <div className="events-page-container">
      <nav className="header">
      <div>HackTheNorth Events!</div>
      <button onClick={() => (handleLogout())} className="logout">Logout</button>
      </nav>
      <div>
        {events.map((event) => (
          <Event event={event}/>
        ))}
      </div>
    </div>
  )
}

// Export the EventsPage component as default.
export default EventsPage;

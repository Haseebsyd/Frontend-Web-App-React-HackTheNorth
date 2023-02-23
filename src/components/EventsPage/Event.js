// Import the necessary components, including React, the Event.css file, and the Card component.
import React from 'react';
import "./Event.css";
import Card from ".././Card/Card.js";

// Create an Event component that receives an event object as a prop.
const Event = ({event}) => {
  // Render the component, which displays event details in a Card component. If the event permission is private, display the private URL as well.
  return (
    <Card>
      <div key={event.id} className="event-container">
        <h2>{event.name}</h2>
        <p><strong>Event Type:</strong> {event.event_type}</p>
        <p><strong>Permission:</strong> {event.permission}</p>
        <p><strong>Start Time:</strong> {new Date(event.start_time).toLocaleString()}</p>
        <p><strong>End Time:</strong> {new Date(event.end_time).toLocaleString()}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Speakers:</strong> {event.speakers.map((speaker) => speaker.name).join(", ")}</p>
        <p><strong>Public URL:</strong> {event.public_url}</p>
        {event.permission === "private" && (
          <p><strong>Private URL:</strong> {event.private_url}</p>
        )}
      </div>
    </Card>
  )
}

// Export the Event component as default.
export default Event;

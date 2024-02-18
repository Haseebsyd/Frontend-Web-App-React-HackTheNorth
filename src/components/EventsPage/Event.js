// Importing necessary React functionalities, custom utility functions, and styles.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateRange, eventTypeColors, renderRelatedEvents } from '../Utility/EventUtility.js';
import Card from ".././Card/Card.js";
import "./Event.css";

// Event component to display individual event details.
const Event = ({ event, allEvents, isLoggedIn }) => {
  // useNavigate hook from React Router for programmatically navigating.
  const navigate = useNavigate();

  // Formatting the date range of the event.
  const eventDateRange = formatDateRange(event.start_time, event.end_time);

  // Function to handle clicks on related events.
  const handleSeeAlsoClick = (relatedEventId, e) => {
    e.stopPropagation(); // Prevents the event from bubbling up to parent elements.
    navigate(`/events/${relatedEventId}`); // Navigates to the related event's detail page.
  };

  // Rendering the event details within a Card component.
  return (
    <Card>
      <div className="event-link">
        <header className={`event-header ${event.permission}-event`}>
          <span className="event-privacy">{event.permission.toUpperCase()} EVENT</span>
          <span className={`event-type ${eventTypeColors[event.event_type.replace('_', '')] || 'orange'}`}>
            {event.event_type.replace('_', ' ').toUpperCase()}
          </span>
        </header>
        <div key={event.id} className="event-container" onClick={() => navigate(`/events/${event.id}`)}>
          <h2 className="event-title">{event.name}</h2>
          <p className="event-date">{eventDateRange}</p>
          {event.event_type !== 'activity' && event.speakers.length > 0 && (
            <p className="event-speakers"><strong>Speaker(s):</strong> {event.speakers.map(speaker => speaker.name).join(', ')}</p>
          )}
          <hr className="blue-line" />
          <p className="event-description">{event.description}</p>
          <hr className="blue-line" />
          {event.related_events.length > 0 && (
            <div className="related-events">
              <strong>See also:</strong>
              <ul>
                {renderRelatedEvents(event.related_events, allEvents, handleSeeAlsoClick, isLoggedIn)}
              </ul>
            </div>
          )}
        </div>
        <footer className="event-footer">
          <div className="event-buttons">
            {event.public_url && (
              <a className="event-url-button public-url" href={event.public_url} target="_blank" rel="noopener noreferrer">
                Watch <img src="https://cdn3.emoji.gg/emojis/YouTube.png" width="20px" height="20px" alt="YouTube" />
              </a>
            )}
            {event.private_url && (
              <a className="event-url-button private-url" href={event.private_url} target="_blank" rel="noopener noreferrer">
                Join 😊
              </a>
            )}
          </div>
        </footer>
      </div>
    </Card>
  );
};

export default Event;
// Importing React functionalities, Router hooks, utility functions, and styles.
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDateRange, eventTypeColors, renderRelatedEvents } from '../Utility/EventUtility.js';
import Card from '../Card/Card.js';
import './EnlargedEvent.css'; 

// EnlargedEvent component for displaying a detailed view of a single event.
const EnlargedEvent = ({ events, isLoggedIn }) => {
  // Retrieving the event ID from the URL parameters and setting up navigation.
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Finding the event that matches the eventId.
  const event = events.find(e => e.id.toString() === eventId);

  // Effect hook to handle the Escape key press for navigation.
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') navigate('/events'); // Navigate back to events page on Escape key press.
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [navigate]);

  // Handling case where the event is not found.
  if (!event) return <div>Event not found</div>;

  // Formatting date range and setting up event type class for styling.
  const eventDateRange = formatDateRange(event.start_time, event.end_time);
  const eventTypeClass = eventTypeColors[event.event_type.replace('_', '')] || 'orange';

  // Functions to handle clicks on related events and closing the enlarged view.
  const handleSeeAlsoClick = relatedEventId => navigate(`/events/${relatedEventId}`);
  const handleCloseClick = () => navigate('/events');

  // Rendering the detailed view of the event.
  return (
    <>
      <button className="close-button" onClick={handleCloseClick}>×</button>
      <div className="enlarged-event-overlay">
        <div className="enlarged-event-container">
          <Card>
            <div className="enlarged-event-content">
              <header className="event-header">
                <span className="event-privacy">{event.permission.toUpperCase()} EVENT</span>
                <span className={`event-type ${eventTypeClass}`}>
                  {event.event_type.replace('_', ' ').toUpperCase()}
                </span>
              </header>
              <div key={event.id} className="event-container">
                <h2 className="event-title">{event.name}</h2>
                <p className="event-date">{eventDateRange}</p>
                {event.event_type !== 'activity' && event.speakers.length > 0 && (
                  <p className="event-speakers"><strong>Speaker(s):</strong> {event.speakers.map(speaker => speaker.name).join(', ')}</p>
                )}
                <hr className="blue-line" />
                <p className="event-description">{event.description}</p>
                <hr className="blue-line" />
                {event.related_events && event.related_events.length > 0 && (
                  <div className="related-events">
                    <strong>See also:</strong>
                    <ul>
                      {renderRelatedEvents(event.related_events, events, handleSeeAlsoClick, isLoggedIn)}
                    </ul>
                  </div>
                )}
              </div>
              <footer className="enlarged-event-footer">
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
        </div>
      </div>
    </>
  );
};

export default EnlargedEvent;
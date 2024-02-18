// Importing React, custom components, utility functions, and styles.
import React, { useState, useEffect } from 'react';
import Event from "./Event.js";
import SearchBar from '../Utility/SearchBar';
import { eventTypeColors } from '../Utility/EventUtility.js';
import "./EventsPage.css";

// EventsPage component to display a list of events.
const EventsPage = ({ events, allEvents, handleLogout, onEventTypeSelect, isLoggedIn, selectedEventType }) => {
  // State variables for search functionality and UI visibility control.
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(events);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Function to handle event type filter click.
  const handleEventTypeClick = type => {
    onEventTypeSelect(type);
  };

  // Function to handle scroll events for dynamic visibility of UI elements.
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const headerHeight = 50;

    if (currentScrollY < lastScrollY) {
      setFooterVisible(true);
      setHeaderVisible(true);
    } else if (currentScrollY > headerHeight) {
      setFooterVisible(false);
      setHeaderVisible(false);
    }
    setLastScrollY(currentScrollY);
  };

  // useEffect hook to add and remove scroll event listener.
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // useEffect hook to update search results based on search term.
  useEffect(() => {
    const newSearchResults = searchTerm
      ? events.filter(event =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : events;
    setSearchResults(newSearchResults);
  }, [searchTerm, events]);

  // Rendering the EventsPage component with search, event display, and event type filters.
  return (
    <div className="events-page-container">
      <nav className={`header ${headerVisible ? '' : 'hidden'}`}>
        <h1>HackTheNorth Events!</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchResults={searchResults} />
        <button onClick={handleLogout} className="logout">Logout</button>
      </nav>
      <div className="card_wrapper">
      {searchResults.map(event => (
        <Event 
          key={event.id} 
          event={event} 
          allEvents={allEvents} 
          isLoggedIn={isLoggedIn}
        />
      ))}
      </div>
      <footer className={`footer-sort ${footerVisible ? '' : 'hidden'}`}>
        <div className="sort-section">
          {Object.keys(eventTypeColors).map(type => {
            if (type === 'activity' && !isLoggedIn) return null;
            const isActive = selectedEventType === type;
            return (
              <button
                key={type}
                onClick={() => handleEventTypeClick(type)}
                className={`sort-button ${isActive ? 'active' : ''}`}
                style={{ backgroundColor: isActive ? eventTypeColors[type] : 'initial' }}
              >
                {type.replace(/_/g, ' ').toUpperCase()}
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
};

export default EventsPage;
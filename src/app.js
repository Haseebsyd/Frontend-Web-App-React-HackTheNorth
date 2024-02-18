// Importing necessary React and Router functionalities along with custom components and styles.
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { fetchAndSortEvents } from './components/Utility/EventUtility.js';
import LoginPage from "./components/LoginPage/LoginPage.js";
import EventsPage from "./components/EventsPage/EventsPage.js";
import EnlargedEvent from "./components/EventsPage/EnlargedEvent.js";
import Background from "./components/Background/Background.js";
import "./app.css";

function App() {
  // State variables to manage events, authentication, user credentials, and event types.
  const [events, setEvents] = useState([]);
  const [publicEvents, setPublicEvents] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuestIn, setIsGuestIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedEventType, setSelectedEventType] = useState(null);

  // useEffect hook to fetch and sort events on component mount.
  useEffect(() => {
    async function getEvents() {
      try {
        const sortedEvents = await fetchAndSortEvents();
        setEvents(sortedEvents);
      } catch (error) {
        setErrMsg(error.message);
      }
    }

    getEvents();
  }, []);

  // Function to handle user login.
  function handleLogin(event) {
    event.preventDefault();
    if (username === "user" && password === "password") {
      setIsLoggedIn(true);
      setPublicEvents(events.filter(event => event.permission === "public"));
    } else {
      setErrMsg("Incorrect Credentials !");
    }
  }

  // Function to handle guest access.
  function handleGuest(event) {
    setIsGuestIn(true);
    setPublicEvents(events.filter(event => event.permission === "public"));
  }

  // Function to handle user logout.
  function handleLogout() {
    setIsLoggedIn(false);
    setIsGuestIn(false);
    setUsername("");
    setPassword("");
    setSelectedEventType(null);
  }

  // Function to handle event type selection.
  const handleEventTypeSelection = type => {
    setSelectedEventType(selectedEventType === type ? null : type);
  };

  // Function to get events to be displayed based on user login status and selected event type.
  const getDisplayedEvents = () => {
    const filteredEvents = isLoggedIn ? events : events.filter(event => event.permission === "public");
    return selectedEventType
      ? filteredEvents.filter(event => event.event_type === selectedEventType)
      : filteredEvents;
  };

  const displayedEvents = getDisplayedEvents();

  // Rendering the main app component with routing and conditional rendering based on login status.
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Background />
      <div className="app">
        {!isLoggedIn && !isGuestIn ? (
          <div className="login">
            <LoginPage
              handleLogin={handleLogin}
              isLoggedIn={isLoggedIn}
              isGuestIn={isGuestIn}
              errMsg={errMsg}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleGuest={handleGuest}
              setPublicEvents={setPublicEvents}
              events={events}
            />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate replace to="/events" />} />
            <Route path="/events" element={
              <EventsPage 
                events={displayedEvents} 
                allEvents={events}
                handleLogout={handleLogout} 
                onEventTypeSelect={handleEventTypeSelection}
                isLoggedIn={isLoggedIn}
                selectedEventType={selectedEventType}
              />} 
            />
            <Route path="/events/:eventId" element={<EnlargedEvent events={isLoggedIn ? events : publicEvents} isLoggedIn={isLoggedIn} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
// Import React, useState and useEffect hooks, fontawesome CSS, LoginPage and EventsPage components, and app.css file.
import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage/LoginPage.js";
import EventsPage from "./components/EventsPage/EventsPage.js";
import "./app.css";

function App() {
  // Declare state variables using useState hook.
  const [events, setEvents] = useState([]);
  const [publicEvents, setPublicEvents] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuestIn, setIsGuestIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Fetch the events data from the API on mount, and sort the events by their start time.
  useEffect(() => {
    fetch("https://api.hackthenorth.com/v3/events")
      .then((response) => response.json())
      .then((json) => {
        const sortedEvents = json.sort((a, b) => a.start_time - b.start_time);
        setEvents(sortedEvents);
      });
  }, []);

  // Handle the login form submission. If the username and password are correct, set the state of isLoggedIn to true. Otherwise, display an error message.
  function handleLogin(event) {
    event.preventDefault();
    if (username === "user" && password === "password") {
      setIsLoggedIn(true);
    } else {
      setErrMsg("Incorrect Credentials !");
    }
  }

  // Handle the guest login button click. Set the state of isGuestIn to true.
  function handleGuest(event) {
    setIsGuestIn(true);
  }

  // Handle the logout button click. Set the state of isLoggedIn and isGuestIn to false, and reset the username and password states.
  function handleLogout() {
    setIsLoggedIn(false);
    setIsGuestIn(false);
    setUsername("");
    setPassword("");
  }

  // Conditionally set the loginStyle variable to either "login" or "remove", based on whether the user is logged in or not.
  const loginStyle = !(isLoggedIn || isGuestIn) ? "login" : "remove"

  // Render the app. If the user is not logged in and is not a guest, display the LoginPage component. If the user is a guest, display the EventsPage component with public events. If the user is logged in, display the EventsPage component with all events.
  return (
    <div className="app">
      <div className={loginStyle}>
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
      {isGuestIn ? (
        <EventsPage events={publicEvents} handleLogout={handleLogout} />
      ) : null}
      {isLoggedIn ? (
        <EventsPage events={events} handleLogout={handleLogout} />
      ) : null}
    </div>
  );
}

// Export the App component as default.
export default App;


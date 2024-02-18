// Importing React and associated styles, and social media icon images.
import React from 'react';
import "./LoginPage.css";
import image from "../../assets/background.webp";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";

// Component to render individual social media icons.
const SocialIcon = ({ icon, name }) => (
  <a href="#">
    <div className="social-icon">
      <img className="social-icon-image" alt={name} src={icon} />
    </div>
  </a>
);

// LoginPage component to handle user login and guest access.
const LoginPage = ({
  handleLogin,
  isLoggedIn,
  isGuestIn,
  errMsg,
  username,
  password,
  setUsername,
  setPassword,
  handleGuest,
  setPublicEvents,
  events
}) => {
  // Array of social media icons for login.
  const loginIcons = [
    { "alt": "Facebook icon for login using social media", "image": facebook },
    { "alt": "Twitter icon for login using social media", "image": twitter },
    { "alt": "Instagram icon for login using social media", "image": instagram }
  ];

  // Function to handle guest login.
  const handleGuestLogin = () => {
    handleGuest();
    setPublicEvents(events.filter(event => event.permission === "public"));
  };

  // Rendering the login page with form and social media login options.
  return (
    <>
      {!isLoggedIn && !isGuestIn && (
        <div className="login-container">
          <div className="top-card-container">
            <img className="login-image" alt="Login visual" src={image} />
            <strong><div className="title">Welcome</div></strong>
          </div>

          <form onSubmit={handleLogin} className="login-content">
            <p className="text">Please enter your login and password!</p>
            {errMsg && <div className="error-msg">{errMsg}</div>}
            <div className="login-info">
              <label htmlFor="username">Username:</label>
              <input
                className="input-fields"
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
              />
              <label htmlFor="password">Password:</label>
              <input
                className="input-fields"
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <a href="#" onClick={() => alert("Username: user\nPassword: password")}>Forgot password?</a>
            <button className="btn-primary" type="submit">Login</button>

            <div className="social-container">
              {loginIcons.map((icon, index) => (
                <SocialIcon key={index} icon={icon.image} name={icon.alt} />
              ))}
            </div>

            <div className="text-center">
              <p className="mb-0">
                Don't have an account? <a href="#" className="url-link">Sign Up</a>
              </p>
            </div>

            <button className="btn-secondary" type="button" onClick={handleGuestLogin}>
              Continue as Guest
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
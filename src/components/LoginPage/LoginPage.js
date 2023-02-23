/* Import login page styles and assets */
import "./LoginPage.css";
import image from "../../assets/background.jpg";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";

/* Function component to render social icons */
const SocialIcon = ({icon, name}) => {
  return (
  <a href="#">
    <div className="social-icon">
      <img className="social-icon-image" alt={name} src={icon} />
    </div>
  </a>
  )
}

/* LoginPage component */
const LoginPage = (props) => {
  const {
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
    events,
  } = props;

  /* Array containing login icons */
  const loginIcons = [
    {
      "alt": "Facebook icon for login using social media",
      "image": facebook,
    },
    {
      "alt": "Twitter icon for login using social media",
      "image": twitter,
    },
    {
      "alt": "Instagram icon for login using social media",
      "image": instagram,
    }
  ]

  /* Render login page */
  return (
    <>
      {!(isLoggedIn || isGuestIn) ? (
        <div className="login-container">
          <div className="top-card-container">
            <img className="login-image" alt="image" src={image} />
            <strong><div className="title">Welcome</div></strong>
          </div>

          <form onSubmit={handleLogin} className="login-content">
            <p className="text">Please enter your login and password!</p>
            {errMsg ? <div className="error-msg"> {errMsg} </div> : null}
            <div className="login-info">
              <label for="fname">Username:</label>
              <input
                className="input-fields"
                label="Username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <label for="fname">Password:</label>
              <input
                className="input-fields"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <a className="url-link" href="#" onClick={() => alert("Incase you forgot lol here's the login\nUsername: user \nPassword: password")}>Forgot password?</a>

            <button
              className="btn-primary"
              type="submit"
            >
              Login
            </button>
            <div className="social-container">
              {loginIcons.map((button) => {
                return(
                  <SocialIcon alt={button.name} icon={button.image}/>
                )
              })} 
            </div>
            <div className="text-center">
              <p className="mb-0">
                Don't have an account?{" "}
                <a href="#" className="url-link">
                  Sign Up
                </a>
              </p>
            </div>
            <button
              className="btn-secondary"
              type="submit"
              onClick={() => {
                handleGuest();
                setPublicEvents(
                  events.filter((event) => event.permission === "public")
                );
              }}
            >
              Continue as Guest
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

/* Export LoginPage component */
export default LoginPage;

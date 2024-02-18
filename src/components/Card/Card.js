// Importing React and associated styles.
import React from 'react';
import "./Card.css";

// Card functional component to render a generic card container.
function Card({ children }) {
  // The component renders a div with a 'card' class, containing any children passed to it.
  // This allows for a reusable card component across different parts of the application.
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default Card;
// Importing necessary React functionalities and styles.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./SearchBar.css";

// SearchBar component to handle event searching.
const SearchBar = ({ searchTerm, setSearchTerm, searchResults }) => {
  // useNavigate hook from React Router for programmatically navigating.
  const navigate = useNavigate();

  // Function to handle changes in the search input field.
  const handleSearchChange = event => setSearchTerm(event.target.value);

  // Function to navigate to the selected event's detailed page.
  const handleSearchSelect = eventId => navigate(`/events/${eventId}`);

  // Rendering the search bar with an input field and a search button.
  return (
    <div className="search-bar-container">
      <label htmlFor="search-events"></label>
      <input
        type="text"
        id="search-events"
        placeholder="Search events"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button 
        onClick={() => searchTerm && handleSearchSelect(searchResults[0]?.id)} 
        className="search-button"
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
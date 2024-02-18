// Importing the date formatting utility from date-fns.
import { format } from 'date-fns';

// API endpoint URL.
const API_URL = "https://api.hackthenorth.com/v3/graphql";

// Async function to fetch and sort events from the API.
export const fetchAndSortEvents = async () => {
  // GraphQL query to retrieve event data.
  const query = `
    query {
      sampleEvents {
        id
        name
        event_type
        permission
        start_time
        end_time
        description
        speakers {
          name
        }
        public_url
        private_url
        related_events
      }
    }
  `;

  try {
    // Fetching data from the API.
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query })
    });
    // Parsing the JSON response.
    const data = await response.json();
    // Sorting the events based on start and end times.
    return sortEvents(data.data.sampleEvents);
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Error fetching event data");
  }
};

// Function to sort events by start time and then by end time.
const sortEvents = events => events.sort((a, b) => {
    const startTimeComparison = new Date(a.start_time) - new Date(b.start_time);
    return startTimeComparison !== 0 ? startTimeComparison : new Date(a.end_time) - new Date(b.end_time);
});

// Function to format the date range of an event.
export const formatDateRange = (start, end) => {
  const formattedStart = format(new Date(start), 'p');
  const formattedEnd = format(new Date(end), 'p');
  const date = format(new Date(start), 'MMMM d, yyyy');
  return `${formattedStart} - ${formattedEnd}, ${date}`;
};

// Object defining colors associated with different event types.
export const eventTypeColors = {
  tech_talk: 'orange',
  activity: 'purple',
  workshop: 'green',
};

// Function to render related events as a list.
export const renderRelatedEvents = (relatedEventsIds, allEvents, handleSeeAlsoClick, isLoggedIn) => relatedEventsIds
    .map(relatedEventId => {
      const relatedEvent = allEvents.find(event => event.id === relatedEventId);
      // Filtering out events that are not accessible or don't exist.
      if (!relatedEvent || (!isLoggedIn && relatedEvent.permission === 'private')) return null;
      // Returning a list item for each related event.
      return <li key={relatedEventId} onClick={e => handleSeeAlsoClick(relatedEventId, e)}>{relatedEvent.name}</li>;
    })
    .filter(item => item);
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../components/Card";

const Results: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [weather, setWeather] = useState<Weather[]>([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get("city");
    const stateCode = queryParams.get("stateCode");

    // Fetch events data
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `/api/event?city=${city}&stateCode=${stateCode}`
        );
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    // Fetch weather data
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather");
        const data = await response.json();
        setWeather(data.weather);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchEvents();
    fetchWeather();
  }, [location.search]);

  return (
    <div className="container mt-4 frosted-glass">
      <h1 className="text-center mb-4">Results</h1>
      <div className="row">
        {events.slice(0, 4).map((event, index) => (
          <div className="col-md-6 col-lg-3 mb-4" key={event.id}>
            <Card
              eventId={event.id}
              name={event.name}
              url={event.url}
              localStartDate={event.localStartDate}
              localStartTime={event.localStartTime}
              FirstImageData={event.FirstImageData}
              weather={weather[index]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;

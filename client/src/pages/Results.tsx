import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Event {
  id: number;
  name: string;
  url: string;
  date: string;
  image: string;
}

interface Weather {
  temp: number;
  description: string;
  icon: string;
}

const Results: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [weather, setWeather] = useState<Weather[]>([]);

  useEffect(() => {
    // Fetch events data
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Fetch weather data
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        const data = await response.json();
        setWeather(data.weather);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchEvents();
    fetchWeather();
  }, []);

  return (
    <div className="container mt-4 frosted-glass">
      <h1 className="text-center mb-4">Results</h1>
      <div className="row">
        {events.slice(0, 4).map((event, index) => (
          <div className="col-md-6 col-lg-3 mb-4" key={event.id}>
            <div className="card">
              <img src={event.image} className="card-img-top" alt={event.name} />
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">Date: {new Date(event.date).toLocaleDateString()}</p>
                <a href={event.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Event Details
                </a>
                {weather[index] && (
                  <div className="mt-3">
                    <p className="card-text">Temperature: {weather[index].temp}°C</p>
                    <p className="card-text">Description: {weather[index].description}</p>
                    <img src={`http://openweathermap.org/img/wn/${weather[index].icon}.png`} alt={weather[index].description} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
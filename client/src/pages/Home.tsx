import SearchForm from "../components/SearchForm";
import { useState } from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface Event{
  eventId: string;
  name: string;
  url: string | undefined;
  localTimestamp: string;
  firstImgData: {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
  };
};

interface Forecast{
  forecast: {
    eventId: string;
    dateTimeString: string;
    temp: string;
    icon: string;
    iconDescription: string;
  }
}

const Home = () => {
  const [data, setData] = useState<{events: Event[], weather: Forecast[]}>({
    events: [],
    weather: []
  })

  return (
    <div className="d-flex justify-content-center align-items-center vh-50 frosted-glass">
      <div className="w-75">
        {data.events.length === 0 ? (
          <>
            <h2 className="text-center mb-4">Search for Events</h2>
            <SearchForm setData={setData} />
          </>
        ) : (
          <div>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: 'white' }} onClick={() => setData({ events: [], weather: [] })}/>
            <h1>Upcoming Events</h1>

            {data.events.map((event) => {          
              // Ensure weather is an array and eventId is valid before using .find
              // Log both eventId and weather eventId for debugging
              const weather = data.weather.find((w) => {
                return w.forecast.eventId === event.eventId;
              });
              return (
                <div className="card" key={event.eventId}>
                  <h3>{event.name}</h3>
                  <p>
                    <strong>
                      {dayjs(event.localTimestamp).format("MM/DD/YYYY")} at{" "}
                      {dayjs(event.localTimestamp).format("h:mm A")}
                    </strong>
                  </p>
                  <a href={event.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={event.firstImgData.url}
                      alt={`Event image for ${event.name}`}
                      className="standardized-img"
                    />
                  </a>

                  {/* Display weather info if found */}
                  {weather ? (
                    <div className="weatherInfo">
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.forecast.icon}.png`}
                        alt={weather.forecast.iconDescription}
                      />
                      <p><strong>Weather will be {weather.forecast.temp}°F with {weather.forecast.iconDescription}.</strong></p>
                    </div>
                  ) : (
                    <p>No weather data available.</p>
                  )}

                  <div>
                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                      <button className="button">View Event Details</button>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

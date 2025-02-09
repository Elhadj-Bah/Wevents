import SearchForm from "../components/SearchForm";
import { useState } from "react";
import dayjs from "dayjs";

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

interface Weather{
    eventId: string;
    dateTimeString: string;
    temp: string;
    icon: string;
    iconDescription: string;
}

const Home = () => {

  // const [eventData, setEventData] = useState<Event[]>([]);
  // const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [data, setData] = useState<{events: Event[], weather: Weather[]}>({
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
            <h1>Upcoming Events</h1>

            {data.events.map((event) => {
              // Log the entire weather data for debugging
              console.log('Weather data:', data.weather); // Add this log
              
              // Ensure weather is an array and eventId is valid before using .find
              //const weather = data.weather.find((w) => w.eventId === event.eventId);
              // Log both eventId and weather eventId for debugging
              const weather = data.weather.find((w) => {
                console.log(`Matching eventId: ${event.eventId} with weather.eventId: ${w.eventId}`);
                return w.eventId === event.eventId;
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
                      <p>
                        Weather will be {weather.temp}°F with {weather.iconDescription}.
                      </p>
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                        alt={weather.iconDescription}
                      />
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

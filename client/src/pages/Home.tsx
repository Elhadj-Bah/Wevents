import SearchForm from "../components/SearchForm";
import { useState } from "react";

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

const Home = () => {

  const [eventData, setEventData] = useState<Event[]>([]);
  //const [weatherData, setWeatherData] = useState([]);

  return(
    <div className="d-flex justify-content-center align-items-center vh-50 frosted-glass">
      <div className="w-75">
        <h2 className="text-center mb-4">Search for Events</h2>
        <SearchForm setEventData={setEventData}/>
        {eventData.map((event) => {
          return(
            <div className="card">
              <div key={event.eventId}>
              <p>{event.name}</p>
              <p>{event.localTimestamp}</p>
              <a href={event.url || "#"} target="_blank" rel="noopener noreferrer">
                <img src={event.firstImgData.url} alt={`event image for ${event.name}`} 
                    className="standardized-img">
                </img>
              </a>
            </div>
            </div>

          );
        })}
      </div>
   </div>
  )
};

export default Home;

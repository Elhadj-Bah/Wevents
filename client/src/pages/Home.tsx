import SearchForm from "../components/SearchForm";
import { useState } from "react";

interface Event{
  eventId: string;
  name: string;
  url: string;
  localTimestamp: string;
  FirstImageData: {
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
            <div key={event.eventId}>
              <p>{event.name}</p>
            </div>
          );
        })}
      </div>
   </div>
  )
};

export default Home;

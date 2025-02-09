import { LocationData } from "../interfaces/LocationInterface";

 const getEvents = async (location: LocationData) => {
  try{
      const {city, stateCode} = location;
      const response = await fetch(
        `http://localhost:3001/api/event?city=${encodeURIComponent(city)}&stateCode=${encodeURIComponent(stateCode)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();

  }catch(error){
    console.error(`getEventRoutes encountered an error: ${error}`);
  }
};

export default getEvents;


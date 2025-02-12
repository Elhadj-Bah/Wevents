import { LocationData } from "../interfaces/LocationInterface";

 const getEvents = async (location: LocationData) => {
  try{
      const {city, stateCode} = location;
      const response = await fetch(
        `/api/event?city=${encodeURIComponent(city)}&stateCode=${encodeURIComponent(stateCode)}`
      );
      
      console.log(` \n API call returned with status: ${response.status}: ${response.statusText}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();

  }catch(error){
    console.error(`getEventRoutes encountered an error: ${error}`);
  }
};

export default getEvents;


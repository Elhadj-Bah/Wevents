import { LocationData } from "../interfaces/locationData";

export const getEvents = async (location: LocationData) => {
  const response = await fetch(
    `http://localhost:3001/events?city=${location.city}&stateCode=${location.stateCode}`
  );
  return await response.json();
};

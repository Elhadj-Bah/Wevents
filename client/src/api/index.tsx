// import { Coordinates } from "../interfaces/coordinates";

// const getWeather = async (latitude: string, longitude: string) => {
//   try {
//     const response = await fetch(
//       `/api/weatherRoutes?lat=${latitude}&lon=${longitude}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ latitude, longitude }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.log("error");
//   }
// };

// https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey={apikey}

import { Router, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import { getEvents } from '../../service/eventService.js';

import ForecastService from '../../service/ForecastService.js';

dotenv.config();

const router = Router();

router.get('/', async (req: Request, res:Response) => {
    try{
        const { city, stateCode } = req.query;

        const eventData = await getEvents(city as string, stateCode as string)
        //if event data is null: API fetch failed more than 3 times. This tends to happen a lot due to the design of the Ticketmaster Discovery API.
        if(!eventData){
          console.error(`\n API fetch failed for "${city} ${stateCode}". Returning 514.`);
          return res.status(514).json({ message: 'Unable to fetch events matching your query.' });
        }
        if(Array.isArray(eventData)){
                       // Create an array of promises to fetch weather data
                       const forecastPromises = eventData.map(async (event) => {
                        const weatherData = await ForecastService.getWeatherLocation(
                            event.latitude, 
                            event.longitude, 
                            event.localTimestamp,
                            event.eventId
                        );
        
                        return weatherData ? { eventId: event.eventId, forecast: weatherData } : null;
                    });
        
                    // Wait for all weather data to be fetched
                    const resolvedForecasts = await Promise.all(forecastPromises);
        
                    // Filter out null values (if any weather data couldn't be retrieved)
                    const forecastData = resolvedForecasts.filter(data => data !== null);
        
                    // Send separate eventData and forecastData while keeping them linked
                    console.log("Returning Data: ", { eventData, forecastData });
                    return res.status(200).json({ eventData, forecastData });        
        }
        return res.status(404).json({message: 'unable to find events that match the query.'});

    }catch(error){
        console.error(`\n Error caught in / router.get method catch block: ${error instanceof Error ? error.stack : error}`);
        return res.status(500).json({ message: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}` });
    }
    
} );


export default router;
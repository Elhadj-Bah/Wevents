import { Router, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import { getEvents } from '../../service/eventService.js';
//import dayjs from 'dayjs';

import ForecastService from '../../service/ForecastService.js';

dotenv.config();

const router = Router();

router.get('/', async (req: Request, res:Response) => {
    try{
        const { city, stateCode } = req.body;
        const eventData = await getEvents(city as string, stateCode as string)
        //if event data is null: API fetch failed more than 3 times.
        if(!eventData){
          throw new Error(`unable to fetch events matching your query in "${city} ${stateCode}".`);
        }else{
            console.log(`EVENT DATA RETURNED SUCCESSFULLY!!!!`);
  
                       // Create an array of promises to fetch weather data
                       const forecastPromises = eventData.map(async (event) => {
                        const weatherData = await ForecastService.getWeatherLocation(
                            event.latitude, 
                            event.longitude, 
                            event.localTimestamp,
                            event.eventId
                        );
        
                        return weatherData ? { eventId: event.id, forecast: weatherData } : null;
                    });
        
                    // Wait for all weather data to be fetched
                    const resolvedForecasts = await Promise.all(forecastPromises);
        
                    // Filter out null values (if any weather data couldn't be retrieved)
                    const forecastData = resolvedForecasts.filter(data => data !== null);
        
                    // Send separate eventData and forecastData while keeping them linked
                    res.status(200).json({ eventData, forecastData });
         
        }

    }catch(error){
        if(error instanceof Error){
            console.error(`\n Error caught in / router.get method catch block: ${error.stack}`);
          }
          else{
            console.error(`\n Error caught in / router.get method catch block: ${error}`);
          }

          res.status(500).json(`An unexpected error occured: ${error}`);
    }
    
} );




export default router;
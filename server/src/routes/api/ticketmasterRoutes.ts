import { Router, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import { filterData, setDateRange } from '../../service/eventService.js';

dotenv.config();

const router = Router();
//TODO: move to controller
router.get('/', async (req: Request, res:Response) => {
    try{
        const { city, stateCode } = req.body;
        const dateArr = setDateRange();
        const [startDate, endDate] = dateArr;
        console.log(`date range: ${startDate} - ${endDate}`);
        //console.log(`city = ${city}, stateCode = ${stateCode}`);
        //console.log(`${process.env.EVENT_API_BASE_URL}events.json?city=${city}&stateCode=${stateCode}&apikey=${process.env.EVENT_API_KEY}`)
        //
        //https://app.ticketmaster.com/discovery/v2/events.json?startDate=2023-01-01&endDate=2023-12-31&apikey=NWfOtfzkVKB2y8lM9vGz4IzGc
        //!!!!const response = await fetch(`${process.env.EVENT_API_BASE_URL}events.json?stateCode=${stateCode}&city=${city}&startDate=${startDate}&endDate=${endDate}&apikey=${process.env.EVENT_API_KEY}`);
        const response = await fetch(
            `${process.env.EVENT_API_BASE_URL}events.json?stateCode=${stateCode}&city=${city}&startDateTime=${startDate}&endDateTime=${endDate}&apikey=${process.env.EVENT_API_KEY}`
          );
        console.log(response);
        console.log(` \n API call returned with status: ${response.status}: ${response.statusText}`);

        if(!response.ok){
            throw new Error(`unable to find events for "${city}, ${stateCode}".`);
        }
    

        const data = await response.json();
        const events = data._embedded.events;
        const eventsCount: number = events.length;
        console.log(`event count = ${eventsCount}`);
        // console.log(`event name = ${data._embedded.events[18].name}`);
        
        filterData(data, eventsCount);
        res.status(200).json(data);

    }catch(error){
        if(error instanceof Error && !(error instanceof TypeError)){
            console.error(`\n Error caught in / router.get method catch block: ${error.stack}`);
          }
          else{
            console.error(`\n Error caught in / router.get method catch block: ${error}`);
          }
          if(error instanceof TypeError){
            console.log(`another TypeError.....great....`);
          }
          res.status(500).json(`An unexpected error occured: ${error}`);
    }
    
} );




export default router;
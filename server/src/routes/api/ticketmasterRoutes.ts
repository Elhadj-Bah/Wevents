import { Router, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import { getEvents } from '../../service/eventService.js';


dotenv.config();

const router = Router();

router.get('/', async (req: Request, res:Response) => {
    try{
        const { city, stateCode } = req.body;
        const eventData = await getEvents(city as string, stateCode as string)
        //if event data is null: API fetch failed more than 3 times.
        if(!eventData){
          throw new Error(`unable to fetch events matching your query.`);
        }
        console.log(`EVENT DATA RETURNED SUCCESSFULLY!!!!`);
         eventData.forEach(element => {
            console.log(element);
         });
        res.status(200).json(eventData);

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
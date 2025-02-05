import { Router, type Request, type Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.get('/', async (req: Request, res:Response) => {
    try{
        const { city, stateCode } = req.body;
        console.log(`city = ${city}, stateCode = ${stateCode}`);
        //console.log(`${process.env.EVENT_API_BASE_URL}events.json?city=${city}&stateCode=${stateCode}&apikey=${process.env.EVENT_API_KEY}`)
        const response = await fetch(`${process.env.EVENT_API_BASE_URL}events.json?stateCode=${stateCode}&city=${city}&apikey=${process.env.EVENT_API_KEY}`);

        console.log(` \n API call returned with status: ${response.status}: ${response.statusText}`);

        if(!response.ok){
            throw new Error(`unable to find events for "${city}, ${stateCode}".`);
        }

        const data = await response.json();
        res.status(200).json(data);

    }catch(error){
        if(error instanceof Error){
            console.error(`\n Error caught in / router.get method catch block: ${error.stack}`);
          }
          else{
            console.error(`\n Error caught in / router.get method catch block: ${error}`);
          }
          res.status(500).json("An unexpected error occured");
    }
    
} );

export default router;
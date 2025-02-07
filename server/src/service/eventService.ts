import dayjs from "dayjs";
import dotenv from 'dotenv';

dotenv.config();

const getEvents = async (city: string, stateCode: string) =>{
    const maxAttempts = 3;
    let attempt = 0;

    const dateArr = setDateRange();
    const [startDate, endDate] = dateArr;

    while(attempt < maxAttempts){
        try{
            console.log(`ATTEMPTS: ${attempt}`);

            const response = await fetch(
                `${process.env.EVENT_API_BASE_URL}events.json?stateCode=${stateCode}&city=${city}&startDateTime=${startDate}&endDateTime=${endDate}
                    &apikey=${process.env.EVENT_API_KEY}`
              );
              
    
            if(!response.ok){
                throw new Error(`unable to find events for "${city}, ${stateCode}".`);
            }
        
    
            const data = await response.json();
            const events = data._embedded.events || [];
            const eventsCount: number = events.length;


           const packData = packageData(data, eventsCount);
            return packData;
    
    
        }catch(error){
            if(error instanceof TypeError){
                console.error(`\n Network error occurred. Retrying... (${attempt + 1}/${maxAttempts})`);
                attempt++;
                if (attempt >= maxAttempts) {
                    console.error("Max retries reached. Returning null.");
                    return null;
                }
            }
            else{
                console.error(`\n Error caught in / router.get method catch block: ${error}`);
                return null;
            }

        }
    }
    return null;
    
}
const packageData = (data: any, eventsCount: number) => {
    const dataArr = [];
  
    for(let i = 0; i < eventsCount; i++){
        let eventPrefix = data._embedded.events[i];

        let name = eventPrefix.name;

        let url = eventPrefix.url;

        let localStartDate = eventPrefix.dates.start.localDate;
        let localStartTime  = eventPrefix.dates.start.localTime;

        let firstImgData = eventPrefix.images[0];//[0] meaning the data for the first image

        
        dataArr.push({name, url, localStartDate, localStartTime, firstImgData});
    }

    return dataArr;
}

const setDateRange = (): string[] => {
    const dateArr: string[] = [];

    const startDate = dayjs().format("YYYY-MM-DDTHH:mm:ssZ ");

    dateArr.push(startDate);

    const endDate = dayjs().add(16, "day").format("YYYY-MM-DDTHH:mm:ssZ ");
   
    dateArr.push(endDate);

    return dateArr;
    
}

export  { getEvents };
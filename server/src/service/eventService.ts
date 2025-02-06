import dayjs from "dayjs";
import dotenv from 'dotenv';

dotenv.config();

const getEvents = async (city: string, stateCode: string) =>{
    const maxAttempts = 3;
    let attempt = 0;
    console.log(`ATTEMPTS: ${attempt}`)

    while(attempt < maxAttempts){
        try{

            const dateArr = setDateRange();
            const [startDate, endDate] = dateArr;
            // console.log(`date range: ${startDate} - ${endDate}`);
            // console.log(`searchTime = ${searchTime}`);
            // console.log(`city = ${city}, stateCode = ${stateCode}`);
            //console.log(`${process.env.EVENT_API_BASE_URL}events.json?city=${city}&stateCode=${stateCode}&apikey=${process.env.EVENT_API_KEY}`)
            const response = await fetch(
                `${process.env.EVENT_API_BASE_URL}events.json?stateCode=${stateCode}&city=${city}&startDateTime=${startDate}&endDateTime=${endDate}
                    &apikey=${process.env.EVENT_API_KEY}`
              );
              
            console.log(` \n API call returned with status: ${response.status}: ${response.statusText}`);
    
            if(!response.ok){
                throw new Error(`unable to find events for "${city}, ${stateCode}".`);
            }
        
    
            const data = await response.json();
            const events = data._embedded.events || [];
            //const eventsCount: number = events.length;
            //console.log(`event count = ${eventsCount}`);
            console.log(`event count = ${events.length}`);
            // console.log(`event name = ${data._embedded.events[18].name}`);
            return data;
    
    
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
    
}
// const filterData = (_data: any, eventsCount: number) => {
//     console.log(`runninng filter data`);
//     const dataArr = [];
//     console.log(`dataArr.length = ${dataArr.length}`);
    

//     for(let i = 0; i < eventsCount; i++){
            

//     }
// }

const setDateRange = (): string[] => {
    const dateArr: string[] = [];
    console.log(`RUNNING setDateRange`);
    const startDate = dayjs().format("YYYY-MM-DDTHH:mm:ssZ ");
    //console.log(`start Date = ${startDate}`);
    dateArr.push(startDate);

    const endDate = dayjs().add(16, "day").format("YYYY-MM-DDTHH:mm:ssZ ");
    //console.log(`endDate = ${endDate}`);
    dateArr.push(endDate);

    return dateArr;
    
}

export  { getEvents };
import dayjs from "dayjs";
import dotenv from 'dotenv';

dotenv.config();

const getEvents = async (city: string, stateCode: string) =>{
    const maxAttempts = 3;
    let attempt = 0;

    const dateArr = setDateRange();
    const [startDate, endDate] = dateArr;
    console.log( `TICKETMASTER API URL PRE CATCH: ${process.env.EVENT_API_BASE_URL}events.json?stateCode=${stateCode}&city=${city}&apikey=${process.env.EVENT_API_KEY}`)

    while(attempt < maxAttempts){
        try{
            console.log(`ATTEMPTS: ${attempt}`);
            console.log( `TICKETMASTER API URL: ${process.env.EVENT_API_BASE_URL}events.json?stateCode=${stateCode}&city=${city}&apikey=${process.env.EVENT_API_KEY}`)
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
            const eventsCount: number = events.length;


           
           const finalData = filterData(packageData(data, eventsCount));
            
            return finalData;
    
    
        }catch(error){
            console.error(error);
            if(error instanceof TypeError){
                console.error(`\n Network error occurred. Retrying... (${attempt + 1}/${maxAttempts})`);
                attempt++;
                if (attempt >= maxAttempts) {
                    console.error("Max retries reached. Returning null.");
                    return null
                }
            }
            else{
                console.error(`\n Error caught in / router.get method catch block: ${error}`);
                throw error;
            }

        }
    }
    throw new Error('attempt to call API failed');
    
}

//this packages up all the relevant data into an object and stores it in an array.
const packageData = (data: any, eventsCount: number) => {
    const dataArr = [];
  
    for(let i = 0; i < eventsCount; i++){
        let eventPrefix = data._embedded.events[i];

        let eventId = eventPrefix.id;

        let name = eventPrefix.name;

        let url = eventPrefix.url;

        let latitude = eventPrefix._embedded.venues[0].location.latitude;

        let longitude = eventPrefix._embedded.venues[0].location.longitude;
        
        let localTimestamp: string = eventPrefix.dates.start.localDate + " " + eventPrefix.dates.start.localTime;

        let firstImgData = eventPrefix.images[0];//[0] meaning the data for the first image

    
        dataArr.push({eventId, name, url, latitude, longitude, localTimestamp, firstImgData});
    }

    //console.log("Packaged Data: ", dataArr);
    return dataArr;
}

//this gets the date range and formats it in a way that the API fetch to ticketmaster can understand.
const setDateRange = (): string[] => {
    const dateArr: string[] = [];

    //!!!Setting the start date to 00:00:00 one day after the request is made to better match the data returned by the OpenWeather API.
    const startDate = dayjs()
                        .add(1, "day")
                        .hour(0)
                        .minute(0)
                        .second(0)
                        .millisecond(0) 
                        .format("YYYY-MM-DDTHH:mm:ssZ ");

    dateArr.push(startDate);

    //!!!The OpenWeather API call can only get the forecast for the next five days
    const endDate = dayjs().add(5, "day").format("YYYY-MM-DDTHH:mm:ssZ ");

    console.log(`*********START DATE*********: ${startDate}`);
    console.log(`*********END DATE*********: ${endDate}`);
   
    dateArr.push(endDate);

    return dateArr;
    
}
//used to select a certain number of events at random indices to pass back to the front end
const filterData  = (dataArr: any[]): any[] => {
    /*generate random numbers(representing array indicies) based on the number of events in the array
    the default is four and the max is 20. This controls how many events are returned to the frontend.*/
    const randomIndices = getUniqueRandomIndicies(dataArr.length, 4);
    const selectedEvents = randomIndices.map(index => dataArr[index]);

    return selectedEvents;
}

const getUniqueRandomIndicies = (arrayLength: number, numToGenerate: number) =>{
    console.log(`NUM TO GENERATE = ${numToGenerate}`);
    if(numToGenerate > arrayLength ){
        throw new Error("Error getting random indexes. The number of indices to generate does not yet exceed the array length");
    }

    const uniqueIndices = new Set<number>(); //makes sure every value is unique

    while(uniqueIndices.size < numToGenerate){
        uniqueIndices.add(Math.floor(Math.random() * arrayLength))
    }

    return Array.from(uniqueIndices);
}
    

export  { getEvents };
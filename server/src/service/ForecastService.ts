
import dayjs from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();



class ForecastService {
    private baseURL: string;
   
    private apiKey: string;

    private latitude: string;

    private longitude: string;


  
    constructor() {
      this.baseURL = process.env.WEATHER_API_BASE_URL || '';
  
      this.apiKey = process.env.WEATHER_API_KEY || '';

      this.latitude ="";

      this.longitude = "";

    }

    async getWeatherLocation(latitude: string, longitude: string, localTimestamp: string, eventId: string){
        try{
            this.latitude = latitude;
            this.longitude = longitude;

            const response = await fetch(`${this.baseURL}?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=imperial`);
            console.log(`API CALL = ${`${this.baseURL}?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=imperial`}`);

            console.log(` \n API call returned with status: ${response.status}: ${response.statusText}`);

            if(!response.ok){
                throw new Error(`Could not find weather data for a location with coordinates "${this.latitude},${this.longitude}"`);
            }else{
                const data = await response.json();
              //  console.log("Forecast data: ", data);
                const dataArr: any[] = data?.list
               // console.log("Forecast list: ", dataArr);
                let minTimeDiff = -1;
                let weatherObj: any = "";
                
                
                dataArr.forEach(forecast => {
                    
                    const weatherDateTime = dayjs(forecast.dt_txt);
                    const localDateTime = dayjs(localTimestamp);

                    // console.log(`WEATHER DATE: ${weatherDateTime}`);
                    // console.log(`LOCAL TIME STAMP ${localDateTime}`);

                    const difference = Math.abs(localDateTime.diff(weatherDateTime));
                    

                    if(minTimeDiff === -1){
                        minTimeDiff = difference;
                        weatherObj = forecast;
                        //console.log(`SET minTimeDiff = ${minTimeDiff}`);
                    }
                    
                    if(minTimeDiff > difference){
                        minTimeDiff = difference;
                        weatherObj = forecast;
                        
                        //console.log(`UPDATE minTimeDiff = ${minTimeDiff}`);
                    }

                })
                if(minTimeDiff === -1 || minTimeDiff > 86400000000){
                    throw new Error('Error in minimum time difference between event and forecast');
                }

                const dateTimeString = weatherObj.dt_txt;
                const temp = weatherObj.main.temp;
                const icon =  weatherObj.weather[0].icon;
                const iconDescription = weatherObj.weather[0].description;


                const finalForecast = {eventId, dateTimeString, temp, icon, iconDescription};
                return finalForecast;
            }
        }catch(error){
            console.error(`getWeatherLocation encountered an error: ${error}`);
            return null;
        }

    }



}

export default new ForecastService();
//import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// class Weather {
//     public date: string;
//     public temp: number;
//     public icon: string;
//     public iconDescription: string;

//     constructor(date: string, temp: number, icon: string, iconDescription: string)  {
//         this.date = date;
//         this.temp = temp;
//         this.icon = icon;
//         this.iconDescription = iconDescription;
//     }
// } 

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

    async getWeatherLocation(latitude: string, longitude: string){
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
                //console.log(`Data = ${JSON.stringify(data)}`);
                return data;
            }
        }catch(error){
            console.error(`getWeatherLocation encountered an error: ${error}`);
            return null;
        }

    }



}

export default new ForecastService();
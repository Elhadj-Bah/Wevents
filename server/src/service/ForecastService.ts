//import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// class Weather {
//     public date: Dayjs | string;
//     public temp: number;
//     public icon: string;
//     public iconDescription: string;

//     constructor(date: Dayjs | string, temp: number, icon: string, iconDescription: string)  {
//         this.date = date;
//         this.temp = temp;
//         this.icon = icon;
//         this.iconDescription = iconDescription;
//     }
// } 

class WeatherService {
    private baseURL?: string;
   
    private apiKey?: string;

    private latitude: string;

    private longitude: string;

  
    constructor(latitude: string, longitude: string) {
      this.baseURL = process.env.WEATHER_API_BASE_URL || '';
  
      this.apiKey = process.env.WEATHER_API_KEY || '';

      this.latitude = latitude;

      this.longitude = longitude;
    }

    async getWeatherLocation(){
        try{
            const response = await fetch(`${this.baseURL}?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=imperial`);

            console.log(` \n API call returned with status: ${response.status}: ${response.statusText}`);

            if(!response.ok){
                throw new Error(`Could not find weather data for a location with coordinates "${this.latitude},${this.longitude}"`);
            }else{
                const data = await response.json();
                console.log(`Data = ${data}`);
            }
        }catch(error){
            console.error(`getWeatherLocation encountered an error: ${error}`);
        }

    }
}

export default WeatherService;
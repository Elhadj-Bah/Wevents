import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

class Weather {
    public date: Dayjs | string;
    public temp: number;
    public icon: string;
    public iconDescription: string;

    constructor(date: Dayjs | string, temp: number, icon: string, iconDescription: string)  {
        this.date = date;
        this.temp = temp;
        this.icon = icon;
        this.iconDescription = iconDescription;
    }
} 

class WeatherServce {
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
}
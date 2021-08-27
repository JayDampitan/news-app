import fetchApi from "./fetchApi"

export interface Request {
    type: string;
    query: string;
    language: string;
    unit: string;
}

export interface Location {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
}

export interface Current {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
}

export interface IWeatherResponse {
  request: Request;
  location: Location;
  current: Current;
}

export class WeatherResponse implements IWeatherResponse {
    request = {
      type: "",
      query: "Los Angeles, United States of America",
      language: "en",
      unit: "m",
    };
    location= {
      name: "",
      country: "",
      region: "",
      lat: "",
      lon: "",
      timezone_id: "",
      localtime: "",
      localtime_epoch: 0,
      utc_offset: "",
    };
    current= {
      observation_time: "",
      temperature: 0,
      weather_code: 0,
      weather_icons: [],
      weather_descriptions: [],
      wind_speed: 0,
      wind_degree: 0,
      wind_dir: "",
      pressure: 0,
      precip: 0,
      humidity: 0,
      cloudcover: 0,
      feelslike: 0,
      uv_index: 0,
      visibility: 0,
    };
}

export interface IWeatherRequest {
    access_key: string;
    query: string;
    units: string|null;
}

export class WeatherRequest implements IWeatherRequest{
    access_key = process.env.REACT_APP_WEATHER_API_KEY || "";
    query = "Fresno, United States of America";
    units = "f";

    constructor(configOverride?: Partial<IWeatherRequest>) {
        if (configOverride) {
            Object.assign(this, configOverride);
        }
    }
}

export const getWeather = async (
  request: IWeatherRequest
): Promise<IWeatherResponse> => {
  const endpoint = `${process.env.REACT_APP_WEATHER_API}/current`;

  let queryString = `${endpoint}?access_key=${request.access_key}&query=${request.query}&units=${request.units}`;

  return await fetchApi(queryString);
}

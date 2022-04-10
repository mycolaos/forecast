import { Timestamp } from 'firebase/firestore/lite';

/**
 * * Those are only partial types for the OpenWeatherMap forecast data, we
 * * didn't find its types packages, if you find such packages, please
 * * @see https://example.com/fake-jira-issue-to-add-typings.
 */
export interface IForecast {
  // Datetime in seconds.
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  rain?: {
    '3h': number;
  };
  snow?: {
    '3h': number;
  };
}

export interface IForecastResponseData {
  list: IForecast[];
}

export interface ISavedForecast {
  timestamp: Timestamp;
  city: string;
  forecastRaw: IForecastResponseData;
  forecastStartDt: number;
}

export interface SearchParams {
  city: string;
  dt?: number;
}

import { Timestamp } from 'firebase/firestore/lite';
import { Observable, of } from 'rxjs';
import { IForecastResponseData, ISavedForecast } from '../types/forecast.types';
import { WeatherService } from './weather.service';

export const forecastResponseDataMock: IForecastResponseData = {
  list: [
    {
      dt: 1649451600,
      main: {
        temp: 10.58,
        humidity: 53,
      },
    },
  ],
};

export const savedForecastMock: ISavedForecast = {
  city: 'Kyiv',
  forecastRaw: forecastResponseDataMock,
  timestamp: new Timestamp(Date.now() / 1000, 0),
  forecastStartDt: Date.now() / 1000,
};

export class WeatherServiceStub extends WeatherService {
  override getForecastHistory(): Observable<ISavedForecast[]> {
    return of([savedForecastMock]);
  }

  override getWeather(city: string): Observable<IForecastResponseData> {
    return of(forecastResponseDataMock);
  }
}

import { Observable, of } from 'rxjs';
import { IForecastResponseData } from '../types/forecast.types';
import { WeatherService } from './weather.service';

export const forecastResponseDataMock = {
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

export class WeatherServiceStub extends WeatherService {
  override getWeather(city: string): Observable<IForecastResponseData> {
    return of(forecastResponseDataMock);
  }
}

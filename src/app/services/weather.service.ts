import { HttpClient } from '@angular/common/http';
import { IForecastResponseData } from '../types/forecast.types';
import { Injectable } from '@angular/core';
import { OPENWEATHER_API_KEY } from 'src/environments/keys';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrlBase = 'http://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  private getApiUrl(city: string): string {
    return `${this.apiUrlBase}/forecast?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  }

  getWeather(city: string): Observable<IForecastResponseData> {
    const apiUrl = this.getApiUrl(city);

    return this.http.get<IForecastResponseData>(apiUrl);
  }
}

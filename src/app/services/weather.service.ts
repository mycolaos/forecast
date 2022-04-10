import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore/lite';
import { IForecastResponseData, ISavedForecast } from '../types/forecast.types';
import {
  Observable,
  OperatorFunction,
  iif,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrlBase = 'http://api.openweathermap.org/data/2.5';
  coll: CollectionReference<any>;

  constructor(private http: HttpClient, private firestore: Firestore) {
    this.coll = collection(firestore, 'forecasts');
  }

  getForecastHistory(): Observable<ISavedForecast[]> {
    const ordered = query<ISavedForecast>(
      this.coll,
      orderBy('timestamp', 'desc')
    );
    return collectionData(ordered);
  }

  getWeather(city: string, dt?: number): Observable<IForecastResponseData> {
    const lowerCaseCity = city.toLowerCase();

    return this.getSavedForecast(lowerCaseCity, dt).pipe(
      this.maybeGetNewForecastAndSave(lowerCaseCity)
    );
  }

  private getSavedForecast = (
    city: string,
    dt?: number
  ): Observable<IForecastResponseData> => {
    // Ensure that `dt` is actually a Number and not a String, otherwise
    // Firebase query will not work properly.
    const dtNumber: number | undefined = dt && Number(dt);
    // Forecast `dt` value is expressed in seconds.
    const currentDt = Date.now() / 1000;

    const whereExactDt = where('forecastStartDt', '==', dtNumber);
    const whereRecentDt = where('forecastStartDt', '>', currentDt);
    const isExactDt = !!dtNumber;

    const q = query(
      this.coll,
      where('city', '==', city),
      isExactDt ? whereExactDt : whereRecentDt
    );

    return collectionData<ISavedForecast>(q).pipe(
      map((data) => data[0]?.forecastRaw)
    );
  };

  private maybeGetNewForecastAndSave = (
    city: string
  ): OperatorFunction<IForecastResponseData, IForecastResponseData> =>
    mergeMap((data) =>
      iif(
        () => !!data,
        of(data),
        this.getOpenWeatherForecast(city).pipe(
          tap((data) => {
            this.saveOpenWeatherForecast(city, data);
          })
        )
      )
    );

  private getApiUrl = (city: string): string => {
    return `${this.apiUrlBase}/forecast?q=${city}&units=metric&appid=${environment.opewnWeatherMap.apiKey}`;
  };

  private getOpenWeatherForecast = (city: string) => {
    const apiUrl = this.getApiUrl(city);

    return this.http.get<IForecastResponseData>(apiUrl);
  };

  private saveOpenWeatherForecast = (
    city: string,
    responseData: IForecastResponseData
  ): void => {
    addDoc(this.coll, {
      city,
      timestamp: new Date(),
      forecastRaw: responseData,
      forecastStartDt: responseData.list[0]?.dt,
    });
  };
}

import { Component, OnInit } from '@angular/core';
import {
  IForecast,
  IForecastResponseData,
  SearchParams,
} from 'src/app/types/forecast.types';

import { HttpErrorResponse } from '@angular/common/http';
import { SeriesLineOptions } from 'highcharts';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  city: string = '';
  serviceError?: boolean;
  cityNotFound?: string;

  temperature: SeriesLineOptions = {
    name: 'Temperature',
    type: 'line',
    tooltip: {
      valueSuffix: ' °C',
      valueDecimals: 1,
    },
  };
  humidity: SeriesLineOptions = {
    name: 'Humidity',
    type: 'line',
    tooltip: {
      valueSuffix: '%',
    },
  };

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  private createSeries = (data: IForecastResponseData): void => {
    const tempTemperature: SeriesLineOptions['data'] = [];
    const tempHumidity: SeriesLineOptions['data'] = [];

    data.list.forEach((data: IForecast) => {
      const {
        dt,
        main: { temp, humidity },
      } = data;

      tempTemperature.push({ x: dt * 1000, y: temp });
      tempHumidity.push({ x: dt * 1000, y: humidity });
    });

    this.temperature = { ...this.temperature, data: tempTemperature };
    this.humidity = { ...this.humidity, data: tempHumidity };
  };

  handleSearch({ city, dt }: SearchParams): void {
    if (!city) {
      this.reset();
      return;
    }

    this.serviceError = false;
    this.cityNotFound = '';
    this.city = city;

    this.weatherService.getWeather(city, dt).subscribe({
      next: (data) => this.createSeries(data),
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.cityNotFound = city;
        } else {
          this.serviceError = true;
        }
      },
    });
  }

  reset = () => {
    this.temperature = { ...this.temperature, data: [] };
    this.humidity = { ...this.humidity, data: [] };
    this.serviceError = false;
    this.cityNotFound = '';
    this.city = '';
  };
}

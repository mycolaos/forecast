import { Component, OnInit } from '@angular/core';
import {
  IForecast,
  IForecastResponseData,
  SearchParams,
} from 'src/app/types/forecast.types';
import { SeriesColumnOptions, SeriesLineOptions } from 'highcharts';

import { HttpErrorResponse } from '@angular/common/http';
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
  rain: SeriesColumnOptions = {
    name: 'Rain',
    type: 'column',
    tooltip: {
      valueDecimals: 2,
    },
  };
  snow: SeriesColumnOptions = {
    name: 'Snow',
    type: 'column',
    tooltip: {
      valueDecimals: 2,
    },
  };

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  private createSeries = (data: IForecastResponseData): void => {
    const tempTemperature: SeriesLineOptions['data'] = [];
    const tempHumidity: SeriesLineOptions['data'] = [];
    const tempRain: SeriesLineOptions['data'] = [];
    const tempSnow: SeriesLineOptions['data'] = [];

    data.list.forEach((data: IForecast) => {
      const {
        dt,
        main: { temp, humidity },
        rain,
        snow,
      } = data;

      tempTemperature.push({ x: dt * 1000, y: temp });
      tempHumidity.push({ x: dt * 1000, y: humidity });
      if (rain) tempRain.push({ x: dt * 1000, y: rain['3h'] });
      if (snow) tempSnow.push({ x: dt * 1000, y: snow['3h'] });
    });

    this.temperature = { ...this.temperature, data: tempTemperature };
    this.humidity = { ...this.humidity, data: tempHumidity };
    this.rain = { ...this.rain, data: tempRain };
    this.snow = { ...this.snow, data: tempSnow };
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

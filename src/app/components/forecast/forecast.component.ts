import { Component, OnInit } from '@angular/core';
import {
  IForecast,
  IForecastResponseData,
  SearchParams,
} from 'src/app/types/forecast.types';
import { SeriesColumnOptions, SeriesLineOptions } from 'highcharts';
import { map, tap } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { WeatherService } from 'src/app/services/weather.service';

const seriesConfig = {
  temperature: {
    name: 'Temperature',
    type: 'line',
    tooltip: {
      valueSuffix: ' °C',
      valueDecimals: 1,
    },
  },
  humidity: {
    name: 'Humidity',
    type: 'line',
    tooltip: {
      valueSuffix: '%',
    },
  },
  rain: {
    name: 'Rain',
    type: 'column',
    tooltip: {
      valueDecimals: 2,
    },
  },
  snow: {
    name: 'Snow',
    type: 'column',
    tooltip: {
      valueDecimals: 2,
    },
  },
};

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  cities: string[] = [];
  serviceError?: boolean;
  cityNotFound?: string;

  temperature: SeriesLineOptions[] = [];
  humidity: SeriesLineOptions[] = [];
  rain: SeriesColumnOptions[] = [];
  snow: SeriesColumnOptions[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  private createSeries = (data: IForecastResponseData, city: string): any => {
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

    return {
      temperature: {
        ...seriesConfig.temperature,
        data: tempTemperature,
        name: city,
      },
      humidity: { ...seriesConfig.humidity, data: tempHumidity, name: city },
      rain: { ...seriesConfig.rain, data: tempRain, name: city },
      snow: { ...seriesConfig.snow, data: tempSnow, name: city },
    };
  };

  private addSeries = ({ temperature, humidity, rain, snow }: any) => {
    this.temperature = [...this.temperature, temperature];
    this.humidity = [...this.humidity, humidity];
    this.rain = [...this.rain, rain];
    this.snow = [...this.snow, snow];
  };

  handleSearch({ cities, dt }: SearchParams): void {
    if (!cities?.length) {
      this.reset();
      return;
    }

    this.serviceError = false;
    this.cityNotFound = '';
    this.cities = cities;
    this.resetSeries();

    cities.forEach((city) =>
      this.weatherService
        .getWeather(city, dt)
        .pipe(map((data) => this.createSeries(data, city)))
        .subscribe({
          next: (data) => this.addSeries(data),
          error: (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.cityNotFound = city;
            } else {
              this.serviceError = true;
            }
          },
        })
    );
  }

  reset = () => {
    this.serviceError = false;
    this.cityNotFound = '';
    this.cities = [];
  };

  resetSeries = () => {
    this.temperature = [];
    this.humidity = [];
    this.rain = [];
    this.snow = [];
  };
}

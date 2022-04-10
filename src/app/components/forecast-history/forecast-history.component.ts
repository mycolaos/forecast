import { Component, OnInit } from '@angular/core';

import { ISavedForecast } from 'src/app/types/forecast.types';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-forecast-history',
  templateUrl: './forecast-history.component.html',
  styleUrls: ['./forecast-history.component.scss'],
})
export class ForecastHistoryComponent implements OnInit {
  forecasts?: ISavedForecast[];
  historySub!: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.historySub = this.weatherService
      .getForecastHistory()
      .subscribe((data) => (this.forecasts = data));
  }

  ngOnDestroy(): void {
    this.historySub.unsubscribe();
  }
}

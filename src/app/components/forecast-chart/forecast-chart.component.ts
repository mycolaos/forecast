import * as Highcharts from 'highcharts';

import { Component, Input, OnInit } from '@angular/core';

import HighchartsNoData from 'highcharts/modules/no-data-to-display';

HighchartsNoData(Highcharts);

@Component({
  selector: 'app-forecast-chart',
  templateUrl: './forecast-chart.component.html',
  styleUrls: ['./forecast-chart.component.scss'],
})
export class ForecastChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  @Input() chartTitle?: string;

  @Input()
  get series(): Highcharts.SeriesOptionsType[] {
    return this._series;
  }
  set series(value: Highcharts.SeriesOptionsType[]) {
    this._series = value;

    this.setChartOptions();
  }
  private _series!: Highcharts.SeriesOptionsType[];

  chartOptions?: Highcharts.Options;

  constructor() {}

  ngOnInit(): void {}

  private setChartOptions(): void {
    this.chartOptions = {
      title: {
        text: this.chartTitle,
        align: 'left',
        margin: 0,
      },
      lang: {
        noData: 'No data to display',
      },
      noData: {
        style: {
          fontWeight: 'bold',
          fontSize: '15px',
          color: '#606060',
        },
      },
      xAxis: [
        {
          // Bottom X hours axis.
          type: 'datetime',
          tickInterval: 12 * 3600 * 1000,
          startOnTick: true,
          endOnTick: true,
          minPadding: 0,
          maxPadding: 0,
          showLastLabel: true,
          labels: {
            format: '{value:%H:%M}',
          },
          crosshair: true,
        },
        {
          // Top X days axis.
          linkedTo: 0,
          type: 'datetime',
          tickInterval: 24 * 3600 * 1000,

          labels: {
            format:
              '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
            align: 'left',
            x: 5,
            y: -5,
          },
          opposite: true,
          tickLength: 20,
          gridLineWidth: 1,
        },
      ],

      yAxis: {
        title: { text: null },
      },

      legend: {
        enabled: false,
      },

      series: this.series,
    };
  }
}

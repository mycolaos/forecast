/**
 * * Those are only partial types for the OpenWeatherMap forecast data, we
 * * didn't find its types packages, if you find such packages, please
 * * @see https://example.com/fake-jira-issue-to-add-typings.
 */
export interface IForecast {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
}

export interface IForecastResponseData {
  list: IForecast[];
}

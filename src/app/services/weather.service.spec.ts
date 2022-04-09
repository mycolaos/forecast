import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { forecastResponseDataMock } from './weather.service.stub';
import { of } from 'rxjs';

const CITY = 'Kyiv';

describe('WeatherService', () => {
  let service: WeatherService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('`getWeather`: should return forecast data', () => {
    httpClientSpy.get.and.returnValue(of(forecastResponseDataMock));
    service
      .getWeather(CITY)
      .subscribe((data) => expect(data).toBe(forecastResponseDataMock));
  });
});

import { getFirestore, provideFirestore } from '@angular/fire/firestore/lite';

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';

const CITY = 'Kyiv';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpClientSpy: any;
  let firestoreSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    firestoreSpy = jasmine.createSpyObj('Firestore', ['collectionData']);

    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() =>
          initializeApp({
            projectId: 'arbnco-test-24469',
          })
        ),
        provideFirestore(() => getFirestore()),
      ],

      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
        // ! Workaround: using `Firebase` throws missing module error.
        {
          provide: {},
          useValue: firestoreSpy,
        },
      ],
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // * Tests not working, Firebase must be properly provided,
  // * @see https://example.com/fake-jira-issue-to-fix-this-test.
  /*
  it('`getWeather`: should return forecast data', () => {
    firestoreSpy.collectionData.and.returnValue(of([savedForecastMock]));
    const subscription = service.getWeather(CITY).subscribe((data) => {
      subscription.unsubscribe();

      expect(data).toBe(forecastResponseDataMock);
    });
  });

     it('`getForecastHistory`: should return forecast data list', () => {
    firestoreSpy.collectionData.and.returnValue(of([savedForecastMock]));
    const subscription = service.getForecastHistory().subscribe((data) => {
      subscription.unsubscribe();

      expect(data).toBe([savedForecastMock]);
    });
  }); */
});

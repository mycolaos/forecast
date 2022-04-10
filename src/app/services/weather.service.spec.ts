import { getFirestore, provideFirestore } from '@angular/fire/firestore/lite';

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { forecastResponseDataMock } from './weather.service.stub';
import { initializeApp } from 'firebase/app';
import { of } from 'rxjs';
import { provideFirebaseApp } from '@angular/fire/app';

const CITY = 'Kyiv';

describe('WeatherService', () => {
  let service: WeatherService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
  const firestoreSpy = jasmine.createSpyObj('Firestore', ['get']);

  beforeEach(() => {
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
        // Workaround: using `Firebase` throws missing module error.
        { provide: {}, useValue: firestoreSpy },
      ],
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('`getWeather`: should return forecast data', () => {
    httpClientSpy.get.and.returnValue(of(forecastResponseDataMock));
    const subscription = service.getWeather(CITY).subscribe((data) => {
      subscription.unsubscribe();

      expect(data).toBe(forecastResponseDataMock);
    });
  });
});

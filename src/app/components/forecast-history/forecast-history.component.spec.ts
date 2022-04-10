import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastHistoryComponent } from './forecast-history.component';
import { WeatherService } from 'src/app/services/weather.service';
import { of } from 'rxjs';
import { savedForecastMock } from 'src/app/services/weather.service.stub';

describe('ForecastHistoryComponent', () => {
  let component: ForecastHistoryComponent;
  let fixture: ComponentFixture<ForecastHistoryComponent>;
  let weatherServiceSpy: any;
  beforeEach(async () => {
    weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getForecastHistory',
    ]);
    weatherServiceSpy.getForecastHistory.and.returnValue(
      of([savedForecastMock])
    );

    await TestBed.configureTestingModule({
      declarations: [ForecastHistoryComponent],
      providers: [
        {
          provide: WeatherService,
          useValue: weatherServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

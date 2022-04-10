import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';
import { SearchFormComponent } from './search-form.component';

const INITIAL_QUERY = 'Kyiv';

describe('SearchFormComponent', () => {
  let qparams$: BehaviorSubject<{ q: string }>;
  let activatedRouteSpy: any;
  let routerSpy: any;

  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {
    qparams$ = new BehaviorSubject({ q: INITIAL_QUERY });
    activatedRouteSpy = jasmine.createSpyObj(
      'ActivatedRoute',
      {},
      { queryParams: qparams$ }
    );
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when url query changes', () => {
    const newCity = 'London';
    const subscription = component.onSubmit.subscribe(({ city }) => {
      subscription.unsubscribe();

      expect(city).toEqual(newCity);
    });
    activatedRouteSpy.queryParams.next({ q: newCity, dt: undefined });
  });

  it('should not emit twice when new value is submitted', () => {
    const newCity = 'London';
    spyOn(component.onSubmit, 'emit');

    // Simulate value to url sync.
    component.value = newCity;
    component.userSubmit();
    activatedRouteSpy.queryParams.next({ q: newCity, dt: undefined });

    expect(component.onSubmit.emit).toHaveBeenCalledOnceWith({
      city: newCity,
      dt: undefined,
    });
  });

  it('should sync url when new value is submitted', () => {
    const newCity = 'Rome';

    component.value = newCity;
    component.userSubmit();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith([], {
      queryParams: { q: newCity },
    });
  });
});

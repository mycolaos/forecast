import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';
import { SearchFormComponent } from './search-form.component';

const INITIAL_QUERY = 'Kyiv';

describe('SearchFormComponent', () => {
  const qparams$ = new BehaviorSubject({ q: INITIAL_QUERY });

  const activatedRouteSpy = jasmine.createSpyObj(
    'ActivatedRoute',
    {},
    { queryParams: qparams$ }
  );

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {
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
    component.onSubmit.subscribe((city: string) => {
      expect(city).toEqual(newCity);
    });
    activatedRouteSpy.queryParams.next({ q: newCity });
  });

  it('should sync url when new value is submitted', () => {
    const newCity = 'Rome';

    component.value = newCity;
    component.submit();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith([], {
      queryParams: { q: newCity },
    });
  });
});

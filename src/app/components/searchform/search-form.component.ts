import { ActivatedRoute, Params, Router } from '@angular/router';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MatChipInputEvent } from '@angular/material/chips';
import { SearchParams } from 'src/app/types/forecast.types';
import { Subscription } from 'rxjs';

type QueryParams = {
  q?: string;
  dt?: number;
};

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [SPACE, ENTER, COMMA] as const;

  values: any = [];
  routeSub!: Subscription;
  queryParams: QueryParams = {};

  @Output() onSubmit = new EventEmitter<SearchParams>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe(this.syncWithNewUrlParams);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  private syncWithNewUrlParams = (params: Params): void => {
    const q = params['q'];
    const dt = params['dt'];
    this.values = q ? q.split(',') : [];
    this.queryParams = { q: q, dt: dt ? Number(dt) : undefined };

    this.submit();
  };

  submit(): void {
    this.onSubmit.emit({
      cities: this.values,
      dt: this.queryParams['dt'],
    });
  }

  userSubmit(): void {
    this.router.navigate([], { queryParams: { q: this.values.join(',') } });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.values.push(value);
    }

    // Clear input.
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.values.indexOf(value);

    if (index >= 0) {
      this.values.splice(index, 1);
    }
  }
}

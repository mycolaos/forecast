import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
  routeSub!: Subscription;
  value: string = '';
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
    this.value = q;
    this.queryParams = { q: q, dt: dt ? Number(dt) : undefined };

    this.submit();
  };

  submit(): void {
    this.onSubmit.emit({ city: this.value, dt: this.queryParams['dt'] });
  }

  userSubmit(): void {
    this.router.navigate([], { queryParams: { q: this.value } });
  }
}

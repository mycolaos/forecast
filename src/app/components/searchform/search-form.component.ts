import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  routeSub!: Subscription;
  value: string = '';
  queryParam: string = '';

  @Output() onSubmit = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe(this.syncWithUrlParams);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  private syncWithUrlParams = (params: Params): void => {
    const q = params['q'];

    if (q !== undefined && q !== this.queryParam) {
      this.value = q;
      this.queryParam = q;
      this.submit();
    }
  };

  submit(): void {
    this.onSubmit.emit(this.value);

    if (this.queryParam !== this.value) {
      this.router.navigate([], { queryParams: { q: this.value } });
    }
  }
}

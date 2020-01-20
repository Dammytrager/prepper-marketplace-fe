import {Component, OnDestroy, OnInit} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'plm-user',
  templateUrl: './auth.html'
})
export class Auth implements OnInit, OnDestroy {
  @select(['site', 'extraInfo']) pageInfo$: Observable<any>;
  $pageInfo$: Subscription;
  pageInfo;

  constructor() {}

  ngOnInit() {
    this.setPage();
  }

  setPage() {
    this.$pageInfo$ = this.pageInfo$.subscribe((data) => {
      this.pageInfo = data;
    });
  }

  ngOnDestroy() {
    this.$pageInfo$.unsubscribe();
  }
}


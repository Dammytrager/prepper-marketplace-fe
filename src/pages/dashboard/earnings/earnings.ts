import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../components/dashboard-header/dashboard-header.interface';

@Component({
  selector: 'plm-earnings',
  templateUrl: './earnings.html'
})
export class Earnings implements OnInit, OnDestroy {
  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: 'Earnings',
    smallHeader: '$15,000 Earned | $7,500 Paid'
  };

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}

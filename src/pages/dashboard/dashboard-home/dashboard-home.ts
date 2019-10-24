import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../components/dashboard-header/dashboard-header.interface';

@Component({
  selector: 'plm-dashboard-home',
  templateUrl: './dashboard-home.html'
})
export class DashboardHome implements OnInit, OnDestroy {

  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: 'Dashboard',
    smallHeader: 'Welcome back, we missed you!'
  };

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}

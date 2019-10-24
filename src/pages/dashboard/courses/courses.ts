import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../components/dashboard-header/dashboard-header.interface';

@Component({
  selector: 'plm-courses',
  templateUrl: './courses.html'
})
export class Courses implements OnInit, OnDestroy {
  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: 'Courses',
    smallHeader: '16 Coursepacks | 4 Approved'
  };
  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}

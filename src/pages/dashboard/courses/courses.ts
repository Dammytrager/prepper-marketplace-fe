import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../components/dashboard-header/dashboard-header.interface';
import {SubheaderInterface} from '../../../components/subheader/subheader.interface';
import {Coursepacks} from '../../../static/dummy/coursepacks';
import {CourseData} from '../../../components/courses/courses.interface';

@Component({
  selector: 'plm-courses',
  templateUrl: './courses.html'
})
export class Courses implements OnInit, OnDestroy {
  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: 'Courses',
    smallHeader: '16 Coursepacks | 4 Approved'
  };

  subheaderData1: SubheaderInterface = {
    title: {
      icon: ['fas', 'book'],
      text: 'Coursepacks'
    },
    action: {
      icon: ['fas', 'plus'],
      text: 'Create Coursepack',
      color: 'primary'
    }
  };

  subheaderData2: SubheaderInterface = {
    title: {
      icon: ['far', 'check-circle'],
      text: 'Approved Coursepacks'
    },
    action: {
      icon: false,
      text: 'View More...',
      color: 'secondary'
    }
  };

  courses: CourseData[] = Coursepacks;

  constructor() {
  }

  ngOnInit() {}

  ngOnDestroy() {}
}

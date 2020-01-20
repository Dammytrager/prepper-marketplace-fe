import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../components/dashboard-header/dashboard-header.interface';
import {SubheaderInterface} from '../../../components/subheader/subheader.interface';
import {Coursepacks as courses} from '../../../static/dummy/coursepacks';
import {CoursePackData} from '../../../components/courses/courses.interface';
import {CreateContentInterface} from '../../../components/create-content/create-content.interface';

@Component({
  selector: 'plm-dashboard-coursepacks',
  templateUrl: './coursepacks.html'
})
export class Coursepacks implements OnInit, OnDestroy {
  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: 'Coursepacks',
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

  createContentData: CreateContentInterface = {
    title: 'Add a new Coursepack',
    formFieldsCount: 2,
    formFields: [
      {
        type: 'text',
        placeholder: 'Coursepack Name'
      },
      {
        type: 'select',
        options: [
          {
            value: '',
            text: 'Select a price'
          },
          {
            value: '3',
            text: '$3'
          },
          {
            value: '5',
            text: '$5'
          },
          {
            value: '10',
            text: '$10'
          }
        ]
      }
    ]
  };

  courses: CoursePackData[] = courses;
  showCreate = false;

  constructor() {
  }

  showCreateContent() {
    this.showCreate = true;
  }

  hideCreateContent() {
    this.showCreate = false;
  }

  ngOnInit() {}

  ngOnDestroy() {}
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../components/dashboard-header/dashboard-header.interface';
import {SubheaderInterface} from '../../../components/subheader/subheader.interface';
import {CreateContentInterface} from '../../../components/create-content/create-content.interface';
import {CoursepackService} from '../../../system/services/coursepack.service';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {CoursePackData} from '../../../components/courses/courses.interface';
import {ModalService} from '../../../system/services/modal.service';
import {CoursepacksModal} from './modal/coursepacks.modal';

@Component({
  selector: 'plm-dashboard-coursepacks',
  templateUrl: './coursepacks.html'
})
export class Coursepacks implements OnInit, OnDestroy {
  @select(['dashboard', 'coursepacks']) coursepacks$: Observable<any>;
  @select(['dashboard', 'coursepacksLength']) coursepacksLength$: Observable<any>;
  $coursepacks$: Subscription;
  $coursepacksLength$: Subscription;
  coursepacks = [];
  coursepacksLength = 0;
  dashboardHeaderdata: DashboardHeaderInterface;

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
  approvedCourses = [];
  showCreate = false;
  showLoading = true;

  constructor(
    private _coursepack: CoursepackService,
    private _modal: ModalService
  ) {
    this._coursepack.getCoursepacks().then((data: any) => {
      this.showLoading = false;
    });
  }

  showCreateContent() {
    this.showCreate = true;
  }

  hideCreateContent() {
    this.showCreate = false;
  }

  openModal() {
    this._modal.openModal(CoursepacksModal);
  }

  async ngOnInit() {
    this.$coursepacks$ = this.coursepacks$.subscribe((data: any) => {
      this.coursepacks = data;
      this.approvedCourses = this.approvedCoursepacks(this.coursepacks);
      this.dashboardHeaderdata = {
        bigHeader: 'Coursepacks',
        smallHeader: `${this.coursepacksLength} Coursepacks | ${this.approvedCourses.length} Approved`,
        bgColor: 'blue'
      };
    });
    this.$coursepacksLength$ = this.coursepacksLength$.subscribe((data: any) => {
      this.coursepacksLength = data;
      this.dashboardHeaderdata = {
        bigHeader: 'Coursepacks',
        smallHeader: `${this.coursepacksLength} Coursepacks | ${this.approvedCourses.length} Approved`,
        bgColor: 'blue'
      };
    });
  }

  approvedCoursepacks(courses: CoursePackData[]) {
    return courses.filter((course) => {
      return course.approve;
    });
  }

  ngOnDestroy() {
    this.$coursepacks$.unsubscribe();
    this.$coursepacksLength$.unsubscribe();
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../components/dashboard-header/dashboard-header.interface';
import {SubheaderInterface} from '../../../components/subheader/subheader.interface';
import {CreateContentInterface} from '../../../components/create-content/create-content.interface';
import {CoursepackService} from '../../../system/services/coursepack.service';
import {NgRedux, select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {CoursePackData} from '../../../components/courses/courses.interface';
import {ModalService} from '../../../system/services/modal.service';
import {CoursepacksModal} from './modal/coursepacks.modal';
import {Router} from '@angular/router';
import {AppState} from '../../../system/interfaces/state/plm.interface';
import {DASHBOARD} from '../../../system/state/actions/dashboard.action';
import {PopupInterface} from '../../../system/interfaces/state/dashboard.interface';

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

  approvedCourses = [];
  showLoading = true;
  popupData: PopupInterface = {
    title: 'Create Coursepack',
    button: 'Create'
  };

  constructor(
    private _coursepack: CoursepackService,
    private _modal: ModalService,
    private _router: Router,
    private _ngRedux: NgRedux<AppState>
  ) {
    this._coursepack.getCoursepacks().then((data: any) => {
      this.showLoading = false;
    });
  }

  viewCourses(coursepack) {
    this._router.navigate(['/dashboard/courses', coursepack._id]);
  }

  addCoursepack() {
    this.popupData = {
      title: 'Create Coursepack',
      button: 'Create',
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(CoursepacksModal);
  }

  editCoursepack(coursepack) {
    this.popupData = {
      title: 'Edit Coursepack',
      button: 'Save',
      data: coursepack
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(CoursepacksModal);
  }

  deleteCoursepack(coursepack) {
    this.popupData = {
      title: 'Delete Coursepack',
      button: 'Delete',
      data: coursepack
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
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

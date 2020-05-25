import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../components/dashboard-header/dashboard-header.interface';
import {SubheaderInterface} from '../../../components/subheader/subheader.interface';
import {CreateContentInterface} from '../../../components/create-content/create-content.interface';
import {SubjectService} from '../../../system/services/subject.service';
import {NgRedux, select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {CoursePackData} from '../../../components/courses/courses.interface';
import {ModalService} from '../../../system/services/modal.service';
import {SubjectsModal} from './modal/subjects.modal';
import {Router} from '@angular/router';
import {AppState} from '../../../system/interfaces/state/plm.interface';
import {DASHBOARD} from '../../../system/state/actions/dashboard.action';
import {PopupInterface} from '../../../system/interfaces/state/dashboard.interface';
import {SUBJECT} from '../../../system/constants/static-content';

@Component({
  selector: 'plm-dashboard-subjects',
  templateUrl: './subjects.html'
})
export class Subjects implements OnInit, OnDestroy {
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
      text: `${SUBJECT}s`
    },
    action: {
      icon: ['fas', 'plus'],
      text: `Create ${SUBJECT}`,
      color: 'primary'
    }
  };

  subheaderData2: SubheaderInterface = {
    title: {
      icon: ['far', 'check-circle'],
      text: `Approved ${SUBJECT}s`
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
    title: `Create ${SUBJECT}`,
    button: 'Create'
  };

  constructor(
    private _coursepack: SubjectService,
    private _modal: ModalService,
    private _router: Router,
    private _ngRedux: NgRedux<AppState>
  ) {
    this._coursepack.getSubjects().then((data: any) => {
      this.showLoading = false;
    });
  }

  viewCourses(coursepack) {
    this._router.navigate(['/dashboard/subjects', coursepack._id]);
  }

  addCoursepack() {
    this.popupData = {
      title: `Create ${SUBJECT}`,
      button: 'Create',
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(SubjectsModal);
  }

  editCoursepack(coursepack) {
    this.popupData = {
      title: `Edit ${SUBJECT}`,
      button: 'Save',
      data: coursepack
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(SubjectsModal);
  }

  deleteCoursepack(coursepack) {
    this.popupData = {
      title: `Delete ${SUBJECT}`,
      button: 'Delete',
      data: coursepack
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(SubjectsModal);
  }

  async ngOnInit() {
    this.$coursepacks$ = this.coursepacks$.subscribe((data: any) => {
      this.coursepacks = data;
      this.approvedCourses = this.approvedCoursepacks(this.coursepacks);
      this.dashboardHeaderdata = {
        bigHeader: `${SUBJECT}s`,
        smallHeader: `${this.coursepacksLength} ${SUBJECT}s | ${this.approvedCourses.length} Approved`,
        bgColor: 'blue'
      };
    });
    this.$coursepacksLength$ = this.coursepacksLength$.subscribe((data: any) => {
      this.coursepacksLength = data;
      this.dashboardHeaderdata = {
        bigHeader: `${SUBJECT}s`,
        smallHeader: `${this.coursepacksLength} ${SUBJECT}s | ${this.approvedCourses.length} Approved`,
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

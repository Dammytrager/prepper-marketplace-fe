import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../../components/dashboard-header/dashboard-header.interface';
import {SubheaderInterface} from '../../../../components/subheader/subheader.interface';
import {CourseService} from '../../../../system/services/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgRedux, select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {DASHBOARD} from '../../../../system/state/actions/dashboard.action';
import {PopupInterface} from '../../../../system/interfaces/state/dashboard.interface';
import {ModalService} from '../../../../system/services/modal.service';
import {AppState} from '../../../../system/interfaces/state/plm.interface';
import {CoursesModal} from './modal/courses.modal';
import {CourseInterface} from '../../../../components/courses/courses.interface';
import {COURSE} from '../../../../system/constants/static-content';

@Component({
  selector: 'plm-dashboard-coursepacks-courses',
  templateUrl: './courses.html'
})
export class Courses implements OnInit, OnDestroy {
  @select(['dashboard', 'courses']) courses$: Observable<any>;
  @select(['dashboard', 'coursesLength']) coursesLength$: Observable<any>;
  @select(['dashboard', 'selectedCoursepack']) selectedCoursepack$: Observable<any>;
  $courses$: Subscription;
  $coursesLength$: Subscription;
  $selectedCoursepack$: Subscription;
  courses: CourseInterface[] = [];
  coursesLength;
  selectedCoursepack;
  showLoading = true;
  popupData: PopupInterface;
  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: '',
    smallHeader: '',
    bgColor: 'white',
    additionalContent: true
  };
  subheaderData: SubheaderInterface = {
    title: {
      text: 'Courses(0)'
    },
    action: {
      text: 'Add Course',
      color: 'primary',
      icon: ['fas', 'plus']
    }
  };

  constructor(
    private _course: CourseService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _modal: ModalService,
    private _ngRedux: NgRedux<AppState>
  ) {
    this.getCourses().then(() => {
      this.showLoading = false;
    });
  }

  ngOnInit() {
    this.$courses$ = this.courses$.subscribe((data: any) => {
      this.courses = data;
    });
    this.$coursesLength$ = this.coursesLength$.subscribe((data: any) => {
      this.coursesLength = data;
      this.subheaderData.title.text = `Course(${this.coursesLength})`;
      this.dashboardHeaderdata.smallHeader = `${this.coursesLength} course`;
    });
    this.$selectedCoursepack$ = this.selectedCoursepack$.subscribe((data: any) => {
      this.selectedCoursepack = data;
      this.dashboardHeaderdata = {
        bigHeader: data && data.title || null,
        smallHeader: data && data.courses ? `${data.courses.length} course` : null,
        bgColor: 'white',
        additionalContent: true
      };
      this.subheaderData.title.text = data && data.courses ? `Course(${data.courses.length})` : 'Courses';

    });
  }

  bookColors(index) {
    const isPrimary = index % 3 === 0;
    const isElegance = (index - 1) % 3 === 0;
    const isPulse = (index - 2) % 3 === 0;
    return {
      'text-primary-blue': isPrimary,
      'text-elegance': isElegance,
      'text-pulse': isPulse
    };
  }

  addCourse() {
    this.popupData = {
      title: 'Create Course',
      button: 'Create',
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(CoursesModal);
  }

  editCourse(course) {
    this.popupData = {
      title: `Edit ${COURSE}`,
      button: 'Save',
      data: course
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(CoursesModal);
  }

  deleteCourse(course) {
    this.popupData = {
      title: `Delete ${COURSE}`,
      button: 'Delete',
      data: course
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(CoursesModal);
  }

  viewLessons(course) {
    this._router.navigate(['/dashboard/courses/lessons', course._id]);
  }

  async getCourses() {
    const coursepackId = this._route.snapshot.paramMap.get('id');
    this._course.getCourses(coursepackId);
  }

  ngOnDestroy() {
    this.$courses$.unsubscribe();
    this.$coursesLength$.unsubscribe();
    this.$selectedCoursepack$.unsubscribe();
  }
}

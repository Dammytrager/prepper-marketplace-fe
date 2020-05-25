import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../../components/dashboard-header/dashboard-header.interface';
import {SubheaderInterface} from '../../../../components/subheader/subheader.interface';
import {TopicService} from '../../../../system/services/topic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgRedux, select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {DASHBOARD} from '../../../../system/state/actions/dashboard.action';
import {PopupInterface} from '../../../../system/interfaces/state/dashboard.interface';
import {ModalService} from '../../../../system/services/modal.service';
import {AppState} from '../../../../system/interfaces/state/plm.interface';
import {TopicsModal} from './modal/topics.modal';
import {CourseInterface} from '../../../../components/courses/courses.interface';
import {TOPIC} from '../../../../system/constants/static-content';

@Component({
  selector: 'plm-dashboard-topics',
  templateUrl: './topics.html'
})
export class Topics implements OnInit, OnDestroy {
  @select(['dashboard', 'courses']) courses$: Observable<any>;
  @select(['dashboard', 'coursesLength']) coursesLength$: Observable<any>;
  @select(['dashboard', 'selectedCoursepack']) selectedCoursepack$: Observable<any>;
  $courses$: Subscription;
  $coursesLength$: Subscription;
  $selectedCoursepack$: Subscription;
  courses: CourseInterface[] | any[] = [];
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
      text: `${TOPIC}(0)`
    },
    action: {
      text: `Add ${TOPIC}`,
      color: 'primary',
      icon: ['fas', 'plus']
    }
  };

  constructor(
    private _course: TopicService,
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
      this.subheaderData.title.text = `${TOPIC}(${this.coursesLength})`;
      this.dashboardHeaderdata.smallHeader = `${this.coursesLength} ${TOPIC}`;
    });
    this.$selectedCoursepack$ = this.selectedCoursepack$.subscribe((data: any) => {
      this.selectedCoursepack = data;
      this.dashboardHeaderdata = {
        bigHeader: data && data.title || null,
        smallHeader: data && data.courses ? `${data.courses.length} ${TOPIC}` : null,
        bgColor: 'white',
        additionalContent: true
      };
      this.subheaderData.title.text = data && data.courses ? `${TOPIC}(${data.courses.length})` : TOPIC;

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
      title: `Create ${TOPIC}`,
      button: 'Create',
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(TopicsModal);
  }

  editCourse(course) {
    this.popupData = {
      title: `Edit ${TOPIC}`,
      button: 'Save',
      data: course
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(TopicsModal);
  }

  deleteCourse(course) {
    this.popupData = {
      title: `Delete ${TOPIC}`,
      button: 'Delete',
      data: course
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(TopicsModal);
  }

  viewLessons(course) {
    this._router.navigate(['/dashboard/subjects/topics', course._id]);
  }

  async getCourses() {
    const coursepackId = this._route.snapshot.paramMap.get('id');
    this._course.getTopics(coursepackId);
  }

  ngOnDestroy() {
    this.$courses$.unsubscribe();
    this.$coursesLength$.unsubscribe();
    this.$selectedCoursepack$.unsubscribe();
  }
}

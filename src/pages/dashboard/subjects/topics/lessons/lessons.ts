import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../../../components/dashboard-header/dashboard-header.interface';
import {SubheaderInterface} from '../../../../../components/subheader/subheader.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../../../../../system/services/lesson.service';
import {NgRedux, select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {DASHBOARD} from '../../../../../system/state/actions/dashboard.action';
import {PopupInterface} from '../../../../../system/interfaces/state/dashboard.interface';
import {ModalService} from '../../../../../system/services/modal.service';
import {AppState} from '../../../../../system/interfaces/state/plm.interface';
import {LessonsModal} from './modal/lessons.modal';
import {LESSON} from '../../../../../system/constants/static-content';

@Component({
  selector: 'plm-dashboard-coursepacks-courses-lessons',
  templateUrl: './lessons.html'
})
export class Lessons implements OnInit, OnDestroy {
  @select(['dashboard', 'lessons']) lessons$: Observable<any>;
  @select(['dashboard', 'lessonsLength']) lessonsLength$: Observable<any>;
  @select(['dashboard', 'selectedCourse']) selectedCourse$: Observable<any>;
  $lessons$: Subscription;
  $lessonsLength$: Subscription;
  $selectedCourse$: Subscription;
  lessons = [];
  lessonsLength;
  selectedCourse;
  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: 'Creative Thinking',
    smallHeader: '3 Lessons',
    bgColor: 'white',
    additionalContent: false
  };
  subheaderData: SubheaderInterface = {
    title: {
      text: 'Lessons(3)'
    },
    action: {
      text: 'Add Lesson',
      color: 'primary',
      icon: ['fas', 'plus']
    }
  };
  showLoading = true;
  popupData: PopupInterface;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _lesson: LessonService,
    private _modal: ModalService,
    private _ngRedux: NgRedux<AppState>
  ) {
    this.getLessons().then(() => {
      this.showLoading = false;
    });
  }

  ngOnInit() {
    this.$lessons$ = this.lessons$.subscribe((data: any) => {
      this.lessons = data;
    });
    this.$lessonsLength$ = this.lessonsLength$.subscribe((data: any) => {
      this.lessonsLength = data;
      this.subheaderData.title.text = `Lessons(${this.lessonsLength})`;
      this.dashboardHeaderdata.smallHeader = `${this.lessonsLength} Lessons`;
    });
    this.$selectedCourse$ = this.selectedCourse$.subscribe((data: any) => {
      this.selectedCourse = data;
      this.dashboardHeaderdata = {
        bigHeader: data && data.name || null,
        smallHeader: data && data.lessons ? `${data.lessons.length} Lessons` : null,
        bgColor: 'white',
        additionalContent: true
      };
      this.subheaderData.title.text = data && data.lessons ? `Lessons(${data.lessons.length})` : 'Lessons';
    });
  }

  viewConversations(lesson) {
    this._router.navigate(['/dashboard/subjects/topics/lessons', lesson._id]);
  }

  addLesson() {
    this.popupData = {
      title: `Create ${LESSON}`,
      button: 'Create',
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(LessonsModal);
  }

  editLesson(lesson) {
    this.popupData = {
      title: `Edit ${LESSON}`,
      button: 'Save',
      data: lesson
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(LessonsModal);
  }

  deleteLesson(lesson) {
    this.popupData = {
      title: `Delete ${LESSON}`,
      button: 'Delete',
      data: lesson
    };
    this._ngRedux.dispatch({type: DASHBOARD.CHANGE_POPUP_DATA, popupData: this.popupData});
    this._modal.openModal(LessonsModal);
  }

  async getLessons() {
    const courseId = this._route.snapshot.paramMap.get('id');
    this._lesson.getLessons(courseId);
  }

  ngOnDestroy() {
    this.$lessons$.unsubscribe();
    this.$lessonsLength$.unsubscribe();
    this.$selectedCourse$.unsubscribe();
  }
}

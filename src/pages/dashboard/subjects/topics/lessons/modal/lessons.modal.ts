import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {BaseModal} from '../../../../../../system/classes/base-modal';
import {PopupInterface} from '../../../../../../system/interfaces/state/dashboard.interface';
import {CoursePackData} from '../../../../../../components/courses/courses.interface';
import {LessonService} from '../../../../../../system/services/lesson.service';
import {LESSON} from '../../../../../../system/constants/static-content';

@Component({
  selector: 'plm-dashboard-lessons-modal',
  templateUrl: './lessons.modal.html'
})
export class LessonsModal extends BaseModal implements OnInit, OnDestroy {
  @select(['dashboard', 'popupData']) popupData$: Observable<PopupInterface>;
  @select(['dashboard', 'selectedCourse']) selectedCourse$: Observable<CoursePackData>;
  $selectedCourse$: Subscription;
  $popupData$: Subscription;
  popupData: PopupInterface;
  selectedCourse: CoursePackData;
  lessonForm: FormGroup;
  showLoader = false;
  isDelete;
  btnClass;

  constructor(
    public _ngbModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _lesson: LessonService
  ) {
    super(_ngbModal);
  }

  async ngOnInit() {
    this.lessonForm = this._fb.group({
      name: ['', Validators.required]
    });
    this.$popupData$ = this.popupData$.subscribe((data) => {
      this.popupData = data;
      this.isDelete = this.popupData.data && this.popupData.title === `Delete ${LESSON}`;
      this.btnClass = {
        'btn-danger': this.isDelete,
        'btn-primary': !this.isDelete
      };
      this.name.setValue(this.popupData.data && this.popupData.data.name || '');
    });
    this.$selectedCourse$ = this.selectedCourse$.subscribe((data) => {
      this.selectedCourse = data;
    });
  }

  get name() {
    return this.lessonForm.get('name');
  }

  createLesson() {
    if (this.lessonForm.valid) {
      this.showLoader = true;
      this._lesson.createLesson(this.selectedCourse._id, this.lessonForm.value).finally(() => {
        this.showLoader = false;
        this.closeModal();
      });
    }
  }

  editLesson() {
    if (this.lessonForm.valid) {
      this.showLoader = true;
      this._lesson.editLesson(this.selectedCourse._id, this.popupData.data._id, this.lessonForm.value).finally(() => {
        this.showLoader = false;
        this.closeModal();
      });
    }
  }

  deleteLesson() {
    this.showLoader = true;
    this._lesson.deleteLesson(this.selectedCourse._id, this.popupData.data._id).finally(() => {
      this.showLoader = false;
      this.closeModal();
    });
  }

  action() {
    switch (this.popupData.title) {
      case `Create ${LESSON}`:
        this.createLesson();
        break;
      case `Edit ${LESSON}`:
        this.editLesson();
        break;
      case `Delete ${LESSON}`:
        this.deleteLesson();
        break;
    }
  }

  ngOnDestroy() {
    this.$popupData$.unsubscribe();
    this.$selectedCourse$.unsubscribe();
  }
}

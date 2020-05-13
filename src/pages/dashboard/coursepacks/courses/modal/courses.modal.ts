import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {BaseModal} from '../../../../../system/classes/base-modal';
import {PopupInterface} from '../../../../../system/interfaces/state/dashboard.interface';
import {CourseService} from '../../../../../system/services/course.service';
import {CoursePackData} from '../../../../../components/courses/courses.interface';

@Component({
  selector: 'plm-dashboard-courses-modal',
  templateUrl: './courses.modal.html'
})
export class CoursesModal extends BaseModal implements OnInit, OnDestroy {
  @select(['dashboard', 'popupData']) popupData$: Observable<PopupInterface>;
  @select(['dashboard', 'selectedCoursepack']) selectedCoursepack$: Observable<CoursePackData>;
  $selectedCoursepack$: Subscription;
  $popupData$: Subscription;
  popupData: PopupInterface;
  selectedCoursepack: CoursePackData;
  courseForm: FormGroup;
  showLoader = false;

  constructor(
    public _ngbModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _course: CourseService
  ) {
    super(_ngbModal);
  }

  async ngOnInit() {
    this.courseForm = this._fb.group({
      name: ['', Validators.required]
    });
    this.$popupData$ = this.popupData$.subscribe((data) => {
      this.popupData = data;
      this.name.setValue(this.popupData.data && this.popupData.data.name || '');
    });
    this.$selectedCoursepack$ = this.selectedCoursepack$.subscribe((data) => {
      this.selectedCoursepack = data;
    });
  }

  get name() {
    return this.courseForm.get('name');
  }

  createCoursepack() {
    if (this.courseForm.valid) {
      this.showLoader = true;
      this._course.createCourse(this.selectedCoursepack._id, this.courseForm.value).finally(() => {
        this.showLoader = false;
        this.closeModal();
      });
    }
  }

  editCourse() {
    if (this.courseForm.valid) {
      this.showLoader = true;
      this._course.editCourse(this.selectedCoursepack._id, this.popupData.data._id, this.courseForm.value).finally(() => {
        this.showLoader = false;
        this.closeModal();
      });
    }
  }

  action() {
    switch (this.popupData.title) {
      case 'Create Course':
        this.createCoursepack();
        break;
      case 'Edit Course':
        this.editCourse();
        break;
    }
  }

  ngOnDestroy() {
    this.$popupData$.unsubscribe();
    this.$selectedCoursepack$.unsubscribe();
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseModal} from '../../../../system/classes/base-modal';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursepackService} from '../../../../system/services/coursepack.service';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {PopupInterface} from '../../../../system/interfaces/state/dashboard.interface';
import {COURSEPACK} from '../../../../system/constants/static-content';

@Component({
  selector: 'plm-dashboard-coursepacks-modal',
  templateUrl: './coursepacks.modal.html'
})
export class CoursepacksModal extends BaseModal implements OnInit, OnDestroy {
  @select(['dashboard', 'popupData']) popupData$: Observable<PopupInterface>;
  $popupData$: Subscription;
  popupData: PopupInterface;
  coursepackForm: FormGroup;
  showLoader = false;
  isDelete;
  btnClass;

  constructor(
    public _ngbModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _coursepack: CoursepackService
  ) {
    super(_ngbModal);
  }

  async ngOnInit() {
    this.coursepackForm = this._fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.$popupData$ = this.popupData$.subscribe((data) => {
      this.popupData = data;
      this.isDelete = this.popupData.data && this.popupData.title === `Delete ${COURSEPACK}`;
      this.btnClass = {
        'btn-danger': this.isDelete,
        'btn-primary': !this.isDelete
      };
      this.title.setValue(this.popupData.data && this.popupData.data.title || '');
      this.price.setValue(this.popupData.data && this.popupData.data.price || '');
    });
  }

  get title() {
    return this.coursepackForm.get('title');
  }

  get price() {
    return this.coursepackForm.get('price');
  }

  createCoursepack() {
    if (this.coursepackForm.valid) {
      this.showLoader = true;
      this._coursepack.createCoursepack(this.coursepackForm.value).finally(() => {
        this.showLoader = false;
        this.closeModal();
      });
    }
  }

  editCoursepack() {
    if (this.coursepackForm.valid) {
      this.showLoader = true;
      this._coursepack.editCoursepack(this.popupData.data._id, this.coursepackForm.value).finally(() => {
        this.showLoader = false;
        this.closeModal();
      });
    }
  }

  deleteCoursepack() {
    this.showLoader = true;
    this._coursepack.deleteCoursepack(this.popupData.data._id).finally(() => {
      this.showLoader = false;
      this.closeModal();
    });
  }

  action() {
    switch (this.popupData.title) {
      case `Create ${COURSEPACK}`:
        this.createCoursepack();
        break;
      case `Edit ${COURSEPACK}`:
        this.editCoursepack();
        break;
      case `Delete ${COURSEPACK}`:
        this.deleteCoursepack();
        break;
    }
  }

  ngOnDestroy() {}
}

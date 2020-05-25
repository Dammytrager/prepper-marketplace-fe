import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseModal} from '../../../../system/classes/base-modal';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubjectService} from '../../../../system/services/subject.service';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {PopupInterface} from '../../../../system/interfaces/state/dashboard.interface';
import {SUBJECT} from '../../../../system/constants/static-content';

@Component({
  selector: 'plm-dashboard-subjects-modal',
  templateUrl: './subjects.modal.html'
})
export class SubjectsModal extends BaseModal implements OnInit, OnDestroy {
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
    private _coursepack: SubjectService
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
      this.isDelete = this.popupData.data && this.popupData.title === `Delete ${SUBJECT}`;
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
      this._coursepack.createSubject(this.coursepackForm.value).finally(() => {
        this.showLoader = false;
        this.closeModal();
      });
    }
  }

  editCoursepack() {
    if (this.coursepackForm.valid) {
      this.showLoader = true;
      this._coursepack.editSubject(this.popupData.data._id, this.coursepackForm.value).finally(() => {
        this.showLoader = false;
        this.closeModal();
      });
    }
  }

  deleteCoursepack() {
    this.showLoader = true;
    this._coursepack.deleteSubject(this.popupData.data._id).finally(() => {
      this.showLoader = false;
      this.closeModal();
    });
  }

  action() {
    switch (this.popupData.title) {
      case `Create ${SUBJECT}`:
        this.createCoursepack();
        break;
      case `Edit ${SUBJECT}`:
        this.editCoursepack();
        break;
      case `Delete ${SUBJECT}`:
        this.deleteCoursepack();
        break;
    }
  }

  ngOnDestroy() {}
}

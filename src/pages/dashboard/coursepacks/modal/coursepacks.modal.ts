import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseModal} from '../../../../system/classes/base-modal';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursepackService} from '../../../../system/services/coursepack.service';

@Component({
  selector: 'plm-dashboard-coursepacks-modal',
  templateUrl: './coursepacks.modal.html'
})
export class CoursepacksModal extends BaseModal implements OnInit, OnDestroy {
  coursepackForm: FormGroup;
  showLoader = false;

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

  ngOnDestroy() {}
}

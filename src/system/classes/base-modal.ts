import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export class BaseModal {
  constructor(protected _ngbModal: NgbActiveModal) {}

  closeModal() {
    this._ngbModal.close();
  }
}

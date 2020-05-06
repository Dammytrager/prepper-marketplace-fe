import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})

export class ModalService {
    constructor(private _ngbmodal: NgbModal) {}

    openModal(component: any,
              options: {
                  ariaLabelledBy?: string;
                  backdrop?: boolean | 'static';
                  beforeDismiss?: () => boolean | Promise<boolean>;
                  centered?: boolean;
                  container?: string;
                  // injector?: Injector;
                  keyboard?: boolean;
                  size?: 'sm' | 'lg' | any;
                  windowClass?: string;
                  backdropClass?: string;
              } = {size: 'md', centered: true, keyboard: false}) {
        return this._ngbmodal.open(component, {
            windowClass: 'center',
            ...options
        });
    }

    dismissAllModal() {
        this._ngbmodal.dismissAll();
    }

}

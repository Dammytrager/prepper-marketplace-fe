import {ToastrService} from 'ngx-toastr';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {ERROR_CODES, ERROR_MESSAGE, FAILURE_MSG, INFO_MSG} from '../constants/static-content';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerService {
  constructor(
    private _toastr: ToastrService,
    private _auth: AuthService,
    private _router: Router) {
  }

  handleNotFoundError(entity) {
    this._toastr.error(`${entity} cannot be found`);
  }

  handleValidationError(errors) {
    let message = '';
    errors.forEach((error) => {
      message += error + '<br>';
    });
    return this._toastr.error(message, '', {
      enableHtml: true,
      timeOut: 7000
    });
  }

  async handleOtherErrors(err) {
    const {error: {code, message}} = err;
    if (message === ERROR_MESSAGE.JWT_EXPIRED) {
      await this._auth.logout();
      this._router.navigate(['/auth/sign-in']);
    } else if (code === ERROR_CODES.UNKNOWN_ERROR) {
      this._toastr.error(FAILURE_MSG.UNKNOWN_ERROR);
    } else {
      this._toastr.error(INFO_MSG.CHECK_INTERNET);
    }
  }
}

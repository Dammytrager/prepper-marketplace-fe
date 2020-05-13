import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {ERROR_CODES, FAILURE_MSG, INFO_MSG, SUCCESS_MSG} from '../constants/static-content';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ForageService} from './storage.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../interfaces/state/plm.interface';
import {parseJwt} from '../utils/utils';
import {USER} from '../state/actions/user.action';
import {AuthService} from './auth.service';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  hostApi = environment.HOST_API;

  constructor(
    private _http: HttpService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    private _storage: ForageService,
    private _ngRedux: NgRedux<AppState>,
    private _auth: AuthService,
    private _errorHandler: ErrorHandlerService
  ) {
  }

  async getProfile() {
    await this._storage.localGet('token').then((token: string) => {
      this._http.setHeaders({token});
      const {id} = parseJwt(token);
      this._http.get(`${this.hostApi}/user/${id}`).then((data) => {
        return this._ngRedux.dispatch({type: USER.CHANGE_USER_DATA, data});
      }).catch((err) => {
        const {error: {code}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._auth.logout().then(() => {
            this._router.navigate(['/auth/sign-in']);
          });
        } else {
          this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }

  async updateProfile(data) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      const {id} = parseJwt(token);
      await this._http.put(`${this.hostApi}/user/profile/${id}`, data).then(async (response: any) => {
        this._ngRedux.dispatch({type: USER.CHANGE_USER_DATA, data: response.data});
        return this._toastr.success(SUCCESS_MSG.successMessage('Profile', 'Updated'));
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._auth.logout().then(() => {
            this._router.navigate(['/auth/sign-in']);
          });
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          this._errorHandler.handleOtherErrors(err);
        }
        return;
      });
    });
  }

  async updatePersonalDetails(data) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      const {id} = parseJwt(token);
      await this._http.put(`${this.hostApi}/user/personal-details/${id}`, data).then(async (response: any) => {
        this._ngRedux.dispatch({type: USER.CHANGE_USER_DATA, data: response.data});
        return this._toastr.success(SUCCESS_MSG.successMessage('Personal Details', 'Updated'));
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._auth.logout().then(() => {
            this._router.navigate(['/auth/sign-in']);
          });
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          this._errorHandler.handleOtherErrors(err);
        }
        return;
      });
    });
  }

  async updatePassword(data) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      const {id} = parseJwt(token);
      await this._http.put(`${this.hostApi}/user/password/${id}`, data).then(async (response: any) => {
        return this._toastr.success(SUCCESS_MSG.successMessage('Password', 'Updated'));
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._auth.logout().then(() => {
            this._router.navigate(['/auth/sign-in']);
          });
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else if (code === ERROR_CODES.UNAUTHORIZED_KEY) {
          this._toastr.error(FAILURE_MSG.INCORRECT_OLD_PASSWORD);
        } else {
          this._errorHandler.handleOtherErrors(err);
        }
        return;
      });
    });
  }
}

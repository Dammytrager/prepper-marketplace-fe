import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {ERROR_CODES, FAILURE_MSG, INFO_MSG, SUCCESS_MSG} from '../constants/static-content';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ForageService} from './storage.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../interfaces/state/plm.interface';
import {USER} from '../state/actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hostApi = environment.HOST_API;

  constructor(
    private _http: HttpService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    private _storage: ForageService,
    private _ngRedux: NgRedux<AppState>
  ) {
  }

  async registerUser(userData) {
    await this._http.post(`${this.hostApi}/auth/register`, userData)
      .then(async (response) => {
        const returnUrl = '/auth/sign-in';
        this._toastr.success(SUCCESS_MSG.ACCOUNT_CREATED, '', {timeOut: 7000});
        return this._router.navigate([returnUrl]);
      })
      .catch((err) => {
        const {error: {errors, code}} = err;
        if (code === ERROR_CODES.DUPLICATE_KEY) {
          this._toastr.error(FAILURE_MSG.ACCOUNT_EXISTS);
        } else if (err.error.code === ERROR_CODES.VALIDATION_ERROR) {
          let message = '';
          errors.forEach((error) => {
            message += error + '<br>';
          });
          this._toastr.error(message, '', {
            enableHtml: true,
            timeOut: 7000
          });
        } else if (code === ERROR_CODES.UNKNOWN_ERROR) {
          this._toastr.error(FAILURE_MSG.UNKNOWN_ERROR);
        } else {
          this._toastr.error(INFO_MSG.CHECK_INTERNET);
        }
      });
  }

  async login(loginData) {
    const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/dashboard/home';
    await this._http.post(`${this.hostApi}/auth/login`, loginData)
      .then(async (response: any) => {
        await this._storage.localSet({key: 'token', data: response.token}).then(async (data) => {
          this._toastr.success(SUCCESS_MSG.LOGIN_SUCCESSFUL);
          this._router.navigate([returnUrl]);
          delete response.token;
          this._ngRedux.dispatch({type: USER.CHANGE_LOGIN_STATUS, status: true});
          return this._ngRedux.dispatch({type: USER.CHANGE_USER_DATA, data: response});
        });
      })
      .catch(async (err) => {
        const {error: {errors, code}} = err;
        if (code === ERROR_CODES.VALIDATION_ERROR || code === ERROR_CODES.UNAUTHORIZED_KEY) {
          let message = '';
          errors.forEach((error) => {
            message += error + '<br>';
          });
          return this._toastr.error(message, '', {
            enableHtml: true,
            timeOut: 7000
          });
        } else if (code === ERROR_CODES.UNKNOWN_ERROR) {
          return this._toastr.error(FAILURE_MSG.UNKNOWN_ERROR);
        } else {
          return this._toastr.error(INFO_MSG.CHECK_INTERNET);
        }
      });
  }

  async logout() {
    await this._storage.localRemove('token').then(() => {
      this._ngRedux.dispatch({type: USER.CHANGE_LOGIN_STATUS, status: false});
    });
  }

  async isLoggedin() {
    await this._storage.localGet('token').then((token) => {
      if (token) {
        this._ngRedux.dispatch({type: USER.CHANGE_LOGIN_STATUS, status: true});
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}

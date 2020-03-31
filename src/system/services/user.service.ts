import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {ERROR_CODES, FAILURE_MSG, SUCCESS_MSG} from '../constants/static-content';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ForageService} from './storage.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../interfaces/state/plm.interface';
import {USER} from '../state/actions/user.action';

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
    private _ngRedux: NgRedux<AppState>
  ) {
  }

  registerUser(userData) {
    return this._http.post(`${this.hostApi}/auth/register`, userData)
      .then((response) => {
        const returnUrl = '/auth/sign-in';
        this._toastr.success(SUCCESS_MSG.ACCOUNT_CREATED, '', {timeOut: 7000});
        this._router.navigate([returnUrl]);
      })
      .catch((err) => {
        if (err.error.code === ERROR_CODES.DUPLICATE_KEY) {
          this._toastr.error(FAILURE_MSG.ACCOUNT_EXISTS);
        } else if (err.error.code === ERROR_CODES.VALIDATION_ERROR) {
          let message = '';
          err.error.errors.forEach((error) => {
            message += error + '<br>';
          });
          this._toastr.error(message, '', {
            enableHtml: true,
            timeOut: 7000
          });
        } else {
          console.log(err);
        }
      });
  }

  login(loginData) {
    const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/dashboard/home';
    this._http.post(`${this.hostApi}/auth/login`, loginData)
      .then(async (response: any) => {
        this._storage.localSet({key: 'token', data: response.token}).then((data) => {
          this._toastr.success(SUCCESS_MSG.LOGIN_SUCCESSFUL);
          this._router.navigate([returnUrl]);
          delete response.token;
          this._ngRedux.dispatch({type: USER.CHANGE_LOGIN_STATUS, status: true});
          return this._ngRedux.dispatch({type: USER.CHANGE_USER_DATA, data: response});
        });
      })
      .catch((err) => {
        const {error: {errors}} = err;
        let message = '';
        errors.forEach((error) => {
          message += error + '<br>';
        });
        this._toastr.error(message, '', {
          enableHtml: true,
          timeOut: 7000
        });
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

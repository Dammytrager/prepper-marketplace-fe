import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {SUBJECT, ERROR_CODES, FAILURE_MSG, INFO_MSG, SUCCESS_MSG, TASK, USER} from '../constants/static-content';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ForageService} from './storage.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../interfaces/state/plm.interface';
import {parseJwt} from '../utils/utils';
import {DASHBOARD} from '../state/actions/dashboard.action';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  hostApi = environment.HOST_API;

  constructor(
    private _http: HttpService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    private _storage: ForageService,
    private _ngRedux: NgRedux<AppState>,
    private _errorHandler: ErrorHandlerService
  ) {
  }

  async getSubjects() {
    await this._storage.localGet('token').then((token: string) => {
      this._http.setHeaders({token});
      const {id} = parseJwt(token);
      this._http.get(`${this.hostApi}/user/${id}/coursepacks`).then((data) => {
        this._ngRedux.dispatch({type: DASHBOARD.CHANGE_USER_COURSEPACKS, coursepacks: data || []});
        return data;
      }).catch((err) => {
        const {error: {code}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(USER);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }

  async createSubject(coursepack) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      const {id} = parseJwt(token);
      await this._http.post(`${this.hostApi}/user/${id}/coursepacks`, coursepack).then((data) => {
        this._toastr.success(SUCCESS_MSG.successMessage(SUBJECT, TASK.CREATED));
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_USER_COURSEPACKS_DATA, coursepacks: data});
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_USER_COURSEPACKS_LENGTH});
        return data;
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(USER);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
        return;
      });
    });
  }

  async editSubject(coursepackId, coursepack) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      const {id} = parseJwt(token);
      await this._http.put(`${this.hostApi}/user/${id}/coursepacks/${coursepackId}`, coursepack).then((data: any) => {
        this._toastr.success(SUCCESS_MSG.successMessage(SUBJECT, TASK.CREATED));
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_USER_COURSEPACKS_DATA, coursepacks: data.data});
        return data;
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(USER);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }

  async deleteSubject(coursepackId) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      const {id} = parseJwt(token);
      await this._http.delete(`${this.hostApi}/user/${id}/coursepacks/${coursepackId}`).then((data: any) => {
        this._toastr.success(SUCCESS_MSG.successMessage(SUBJECT, TASK.DELETED));
        this._ngRedux.dispatch({type: DASHBOARD.REMOVE_COURSEPACK, coursepack: {_id: coursepackId}});
        return data;
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(USER);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }
}

import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {TOPIC, SUBJECT, ERROR_CODES, SUCCESS_MSG, TASK} from '../constants/static-content';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ForageService} from './storage.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../interfaces/state/plm.interface';
import {DASHBOARD} from '../state/actions/dashboard.action';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

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

  async getTopics(coursepackId) {
    await this._storage.localGet('token').then((token: string) => {
      this._http.setHeaders({token});
      this._http.get(`${this.hostApi}/coursepacks/${coursepackId}/courses`).then((data: any) => {
        this._ngRedux.dispatch({type: DASHBOARD.CHANGE_COURSES, courses: data.data || []});
        this._ngRedux.dispatch({type: DASHBOARD.CHANGE_SELECTED_COURSEPACK, selectedCoursepack: data.coursepack});
        return data;
      }).catch((err) => {
        const {error: {code}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(SUBJECT);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }

  async createTopic(coursepackId, course) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      await this._http.post(`${this.hostApi}/coursepacks/${coursepackId}/courses`, course).then((data) => {
        this._toastr.success(SUCCESS_MSG.successMessage(TOPIC, TASK.CREATED));
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_COURSE_DATA, courses: data});
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_COURSES_LENGTH});
        return data;
      }).catch((err) => {
        console.log(err);
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(SUBJECT);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
        return;
      });
    });
  }

  async editTopic(coursepackId, courseId, course) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      await this._http.put(`${this.hostApi}/coursepacks/${coursepackId}/courses/${courseId}`, course).then((data: any) => {
        this._toastr.success(SUCCESS_MSG.successMessage(TOPIC, TASK.UPDATED));
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_COURSE_DATA, courses: data.data});
        return data;
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(SUBJECT);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }

  async deleteTopic(coursepackId, courseId) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      await this._http.delete(`${this.hostApi}/coursepacks/${coursepackId}/courses/${courseId}`).then((data: any) => {
        this._toastr.success(SUCCESS_MSG.successMessage(TOPIC, TASK.DELETED));
        this._ngRedux.dispatch({type: DASHBOARD.REMOVE_COURSE, course: {_id: courseId}});
        return data;
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(SUBJECT);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }
}

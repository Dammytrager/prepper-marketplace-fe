import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {TOPIC, ERROR_CODES, LESSON, SUCCESS_MSG, TASK} from '../constants/static-content';
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
export class LessonService {

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

  async getLessons(courseId) {
    await this._storage.localGet('token').then((token: string) => {
      this._http.setHeaders({token});
      this._http.get(`${this.hostApi}/courses/${courseId}/lessons`).then((data: any) => {
        this._ngRedux.dispatch({type: DASHBOARD.CHANGE_LESSONS, lessons: data.data || []});
        this._ngRedux.dispatch({type: DASHBOARD.CHANGE_SELECTED_COURSE, selectedCourse: data.course});
        return data;
      }).catch((err) => {
        const {error: {code}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(TOPIC);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }

  async createLesson(courseId, lesson) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      await this._http.post(`${this.hostApi}/courses/${courseId}/lessons`, lesson).then((data) => {
        this._toastr.success(SUCCESS_MSG.successMessage(LESSON, TASK.CREATED));
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_LESSON_DATA, lessons: data});
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_LESSONS_LENGTH});
        return data;
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(TOPIC);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
        return;
      });
    });
  }

  async editLesson(courseId, lessonId, lesson) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      await this._http.put(`${this.hostApi}/courses/${courseId}/lessons/${lessonId}`, lesson).then((data: any) => {
        this._toastr.success(SUCCESS_MSG.successMessage(TOPIC, TASK.UPDATED));
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_LESSON_DATA, lessons: data.data});
        return data;
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(TOPIC);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }

  async deleteLesson(courseId, lessonId) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      await this._http.delete(`${this.hostApi}/courses/${courseId}/lessons/${lessonId}`).then((data: any) => {
        this._toastr.success(SUCCESS_MSG.successMessage(TOPIC, TASK.UPDATED));
        this._ngRedux.dispatch({type: DASHBOARD.REMOVE_LESSON, lesson: {_id: lessonId}});
        return data;
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(TOPIC);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }

}

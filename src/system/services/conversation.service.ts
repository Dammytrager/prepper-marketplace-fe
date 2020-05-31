import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {TOPIC, ERROR_CODES, LESSON, SUCCESS_MSG, TASK, CONVERSATION} from '../constants/static-content';
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
export class ConversationService {

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

  async getConversations(lessonId) {
    await this._storage.localGet('token').then((token: string) => {
      this._http.setHeaders({token});
      this._http.get(`${this.hostApi}/lessons/${lessonId}/conversations`).then((data: any) => {
        this._ngRedux.dispatch({type: DASHBOARD.CHANGE_CONVERSATIONS, conversations: data.data || []});
        this._ngRedux.dispatch({type: DASHBOARD.CHANGE_SELECTED_LESSON, selectedLesson: data.lesson});
        return data;
      }).catch((err) => {
        const {error: {code}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(LESSON);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }

  async createConversation(lessonId, conversation, type) {
    await this._storage.localGet('token').then(async (token: string) => {
      const route = type ? `${this.hostApi}/lessons/${lessonId}/conversations/image` : `${this.hostApi}/lessons/${lessonId}/conversations`;
      this._http.setHeaders({token});
      await this._http.post(route, conversation).then((data) => {
        this._toastr.success(SUCCESS_MSG.successMessage(CONVERSATION, TASK.CREATED));
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_CONVERSATION_DATA, conversations: data});
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_CONVERSATIONS_LENGTH});
        return data;
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(LESSON);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
        return;
      });
    });
  }

  async editConversation(lessonId, conversationId, conversation, type) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      const route = type ? `${this.hostApi}/lessons/${lessonId}/conversations/${conversationId}/image` :
        `${this.hostApi}/lessons/${lessonId}/conversations/${conversationId}`;
      await this._http.put(route, conversation).then((data: any) => {
        this._toastr.success(SUCCESS_MSG.successMessage(CONVERSATION, TASK.UPDATED));
        this._ngRedux.dispatch({type: DASHBOARD.UPDATE_CONVERSATION_DATA, conversations: data.data});
        return data;
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(LESSON);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }

  async deleteConversation(lessonId, conversationId) {
    await this._storage.localGet('token').then(async (token: string) => {
      this._http.setHeaders({token});
      await this._http.delete(`${this.hostApi}/lessons/${lessonId}/conversations/${conversationId}`).then((data: any) => {
        this._toastr.success(SUCCESS_MSG.successMessage(CONVERSATION, TASK.DELETED));
        this._ngRedux.dispatch({type: DASHBOARD.REMOVE_CONVERSATION, conversations: {_id: conversationId}});
        return data;
      }).catch((err) => {
        const {error: {code, errors}} = err;
        if (code === ERROR_CODES.NOT_FOUND) {
          this._errorHandler.handleNotFoundError(LESSON);
        } else if (code === ERROR_CODES.VALIDATION_ERROR) {
          this._errorHandler.handleValidationError(errors);
        } else {
          return this._errorHandler.handleOtherErrors(err);
        }
      });
    });
  }

}

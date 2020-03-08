import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  hostApi = environment.HOST_API;

  constructor(private _http: HttpService) {
  }

  registerUser(userData) {
    return this._http.post(`${this.hostApi}/auth/register`, userData);
  }
}

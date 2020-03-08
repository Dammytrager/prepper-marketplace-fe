import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  _headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
  }

  get(url: string) {
    return this.http.get(url, {
      headers: this.Headers
    }).pipe(
      map((res: HttpResponse<any>) => res)
    ).toPromise();
  }

  download(url: string, options = {}) {
    return this.http.get(url, {
      headers: this.Headers,
      ...options
    }).toPromise();
  }

  post(url: string, data: object, headers?) {
    return this.http.post(url, data, {
      headers: headers || this.Headers
    }).pipe(
      map((res: HttpResponse<any>) => res)
    ).toPromise();
  }

  put(url: string, data: object) {
    return this.http.put(url, data, {
      headers: this.Headers
    }).pipe(
      map((res: HttpResponse<any>) => res)
    ).toPromise();
  }

  delete(url: string, data?: object) {
    return this.http.delete(url, {
      headers: this.Headers
    }).pipe(
      map((res: HttpResponse<any>) => res)
    ).toPromise();
  }

  setHeaders(data?: { token: string }, content_type?) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', content_type || 'application/json');
    if (data && data.token) {
      headers = headers.append('Authorization', `Bearer ${data.token}`);
    }
    this._headers = headers;
  }

  get Headers() {
    return this._headers;
  }

  customHeaders(options: { name: string, value: string }[]) {
    let headers: HttpHeaders = new HttpHeaders();
    options.forEach(header => {
      headers = headers.append(header.name, header.value);
    });

    return headers;
  }
}



import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as appSetting from 'application-settings';

import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/map";

import env from '../env';

@Injectable()
export class AuthService {
  private _subject: Subject<Object> = new Subject<Object>();

  constructor(private http: Http) {}

  get observable() {
    return this._subject.asObservable();
  }

  login() {
    this._subject.next({action: 'login'});
  }

  logout() {
    this._subject.next({action: 'logout'});
  }
}

import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import env from '../env';

@Injectable()
export class DataService {
  private _subject: Subject<Object> = new Subject<Object>();
}

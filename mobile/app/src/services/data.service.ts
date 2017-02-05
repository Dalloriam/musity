import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { PlayerService } from './player.service';
import env from '../env';

@Injectable()
export class DataService {
  private _subject: Subject<Object> = new Subject<Object>();
  private URL: string = env.baseUrl + env.api.location;
  private loc: string = '';
  private data: any;

  constructor(private http: Http, private playerService: PlayerService) {}

  get observable() {
    return this._subject.asObservable();
  }

  setLoc(loc: any) {
    this.http.get(`${this.URL}/${loc.longitude}/${loc.latitude}`)
    .map(res => res.json())
    .subscribe((data: any) => {
      console.log(JSON.stringify(data));
      if (data.id !== this.loc) {
        this._subject.next({action: 'new'});
        this.loc = data.id;
        this._subject.next({action: 'location', data: {title: data.title, artists: data.artists}});
        if (data.tracks) {
          let dt = data.tracks[Math.floor(Math.random() * data.tracks.length)];
          this.playerService.play(dt.spotify_uri, dt.spotify_id);
          data.tracks.map((x) => { this.getTrackData(x.spotify_id); });
        }
      }
    }, (e) => { console.log('Error:' + e); });
  }

  getTrackData(id: any) {
    if (id) {
      this.http.get(`https://api.spotify.com/v1/tracks/${id}`)
      .map(res => res.json())
      .subscribe((data: any) => {
        this._subject.next({action: 'track', data: data});
      }, (e) => { console.log(e); });
    }
  }
}

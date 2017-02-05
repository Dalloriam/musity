import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { TNSSpotifyPlayer, TNSSpotifyAuth } from 'nativescript-spotify';

import env from '../env';
import { AuthService } from './auth.service';

@Injectable()
export class PlayerService {
  private _subject: Subject<Object> = new Subject<Object>();
  private playing: boolean = false;
  private _spotify: TNSSpotifyPlayer;
  private track: string = '';
  private uri: string = '';

  constructor(private authService: AuthService) {
    this._spotify = new TNSSpotifyPlayer();
    this._spotify.initPlayer(true);
    this.setupEvents();
  }

  currentTrack() {
    return this.track;
  }

  login() {
    TNSSpotifyAuth.LOGIN();
  }

  logout() {
    this.stop();
    TNSSpotifyAuth.LOGOUT();
    this.authService.logout();
  }

  play(uri: string, id: string) {
    if (!this._spotify.isPlaying() || this.track !== id) {
      this.track = id;
      this.uri = uri;
      console.log('switchApp');
      this._spotify.togglePlay(uri).then((isPlaying: boolean) => {
        console.log('track playing');
      }, (error) => {
        console.log(`Playback error: ${error}`);
      });
    }
  }

  stop() {
    if (this._spotify.isPlaying()) {
      this._spotify.togglePlay(this.uri).then((isPlaying: boolean) => {
        console.log('track playing');
      }, (error) => {
        console.log(`Playback error: ${error}`);
      });
    }
  }

  loginSuccess() {
    this.authService.login();
  }

  loginCheck() {
    console.log('check');
  }

  loginError(error: any) {
    console.log('error:' + JSON.stringify(error));
  }

  updateLogin(status: boolean) {
    console.log('update');
  }

  setupEvents() {
    this._spotify.events.on('playerReady', (eventData: any) => {
      if (eventData && eventData.data.loggedIn) {
        this.loginSuccess();
      }
    });

    this._spotify.auth.events.on('authLoginChange', (eventData: any) => {
      this.updateLogin(eventData.data.status);
    });

    this._spotify.auth.events.on('authLoginCheck', (eventData: any) => {
      this.loginCheck();
    });

    this._spotify.auth.events.on('authLoginSuccess', (eventData: any) => {
      this.loginSuccess();
    });

    this._spotify.auth.events.on('authLoginError', (eventData: any) => {
      this.loginError(eventData.data);
    });
  }
}

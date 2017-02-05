import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Page } from 'ui/page';
import { Animation } from 'ui/animation';
import { View } from 'ui/core/view';

import { PlayerService } from '../../services/player.service';
import { AuthService } from '../../services/auth.service';
import { GeolocationService } from '../../services/geolocation.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'src/components/dashboard/dashboard.component.html',
})
export class DashboardCmp implements OnInit, OnDestroy {
  @ViewChild('btnContainer') btnContainer: ElementRef;
  @ViewChild('lblTitle') lblTitle: ElementRef;
  @ViewChild('lblArtist') lblArtist: ElementRef;

  private _subscriptionAuth: Subscription;
  private _subscriptionData: Subscription;
  private btnGeolocWatch: boolean = true;
  private title: string = '';
  private artists: string = '';
  private tracks: any[] = [];

  constructor(private page: Page, private playerService: PlayerService, private authService: AuthService, private router: Router, private geolocationService: GeolocationService, private dataService: DataService) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this._subscriptionAuth = this.authService.observable.subscribe((value: any) => {
      if (value.action === 'logout') {
        this.geolocationService.stopWatch();
        this.router.navigate(['']);
      }
    });

    this._subscriptionData = this.dataService.observable.subscribe((value: any) => {
      if (value.action === 'location') {
        console.log(value.data.title);
        if (value.data.title) {
          this.lblTitle.nativeElement.text = 'Title: ' + value.data.title;
        } else {
          this.lblTitle.nativeElement.text = 'Title: Untitled';
        }

        if (value.data.artists) {
          this.lblArtist.nativeElement.text = 'Artist:' + value.data.artists;
        } else {
          this.lblArtist.nativeElement.text = 'Artist: No Artist';
        }
      } else if (value.action === 'track') {
        console.log(JSON.stringify(value.data));
        this.tracks.push(value.data);
      } else if (value.action === 'new') {
        this.tracks = [];
      }
    });

    this.geolocationService.startWatch();
  }

  ngOnDestroy() {
    if (this._subscriptionAuth) {
      this._subscriptionAuth.unsubscribe();
    }

    if (this._subscriptionData) {
      this._subscriptionData.unsubscribe();
    }
  }

  startGeolocation() {
    if (this.geolocationService.isEnabled()) {
      this.geolocationService.startWatch();
      let btnContainer = <View>this.btnContainer.nativeElement;
      btnContainer.animate({
        opacity: 0,
        duration: 500
      }).then(() => {
        btnContainer.style.visibility = 'collapse';
      }).catch(() => {});
    } else {
      this.geolocationService.enable();
    }
  }
}

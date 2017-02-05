import { Injectable } from '@angular/core';
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "ui/enums";

import { DataService } from './data.service';

@Injectable()
export class GeolocationService {
  private watchId: any;

  constructor(private dataService: DataService) {}

  isEnabled() {
    return geolocation.isEnabled();
  }

  enable() {
    if (!geolocation.isEnabled()) {
      geolocation.enableLocationRequest();
    }
  }

  startWatch() {
    if (geolocation.isEnabled() && !this.watchId) {
      console.log('watchStart');
      this.watchId = geolocation.watchLocation(
        (loc) => { if (loc) { this.dataService.setLoc(loc); } },
        (e) => { console.log("Error: " + e.message); },
        { desiredAccuracy: Accuracy.high, updateDistance: 0.1, minimumUpdateTime: 200 }
      );
    }
  }

  stopWatch() {
    if (this.watchId) {
      geolocation.clearWatch(this.watchId);
    }
  }
}

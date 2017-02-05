import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Page } from 'ui/page';

import { PlayerService } from '../../services/player.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'src/components/dashboard/dashboard.component.html',
})
export class DashboardCmp implements OnInit, OnDestroy {
  /*private _subscriptionAuth: Subscription;
  private artiste: string = '';
  private title: string = '';*/

  constructor(private page: Page, private playerService: PlayerService, private authService: AuthService, private router: Router) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    /*this._subscriptionAuth = this.authService.observable.subscribe((value: any) => {
      if (value.action === 'logout') {
        this.router.navigate(['']);
      }
    });*/
  }

  ngOnDestroy() {
    /*if (this._subscriptionAuth) {
      this._subscriptionAuth.unsubscribe();
    }*/
  }
}

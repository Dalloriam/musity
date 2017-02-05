import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Page } from 'ui/page';

import { PlayerService } from '../../services/player.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: 'src/components/auth/auth.component.html',
})
export class AuthCmp implements OnInit, OnDestroy {
  private _subscriptionAuth: Subscription;
  private showIndicator: boolean = false;

  constructor(private page: Page, private router: Router, private authService: AuthService, private notificationService: NotificationService, private playerService: PlayerService) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this._subscriptionAuth = this.authService.observable.subscribe((value: any) => {
      if (value.action === 'login') {
        if (value.err) {
          this.notificationService.alert('Error', 'Invalid connection', 'Ok');
        } else {
          this.router.navigate(['dashboard']);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this._subscriptionAuth) {
      this._subscriptionAuth.unsubscribe();
    }
  }

  login() {
    this.playerService.login();
  }
}

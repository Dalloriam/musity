import { Component } from '@angular/core';
import { Page } from 'ui/page';

@Component({
  selector: 'ns-app',
  template: '<page-router-outlet></page-router-outlet>'
})
export class AppComponent {
  constructor(private page: Page) {
    this.page.actionBarHidden = true;
  }
}

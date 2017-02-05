import { Injectable } from '@angular/core';
import * as Dialogs from 'ui/dialogs';
import * as platform from 'platform';
import * as application from 'application';

declare var android: any;

@Injectable()
export class NotificationService {
  constructor() {}

  notify(msg: string) {
    switch (platform.device.os) {
      case platform.platformNames.android:
      android.widget.Toast.makeText(application.android.context, msg, android.widget.Toast.LENGTH_SHORT).show();
      break;
      case platform.platformNames.ios:
      console.log(msg);
      break;
    }
  }

  alert(title: string, msg: string, btn: string) {
    Dialogs.alert({ title: title, message: msg, okButtonText: btn });
  }
}

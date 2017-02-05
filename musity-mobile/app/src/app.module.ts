import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { DataService } from './services/data.service';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { PlayerService } from './services/player.service';

import { AppComponent } from '../app.component';
import { DashboardCmp } from './components/dashboard/dashboard.component';
import { AuthCmp } from './components/auth/auth.component';
import { ActionbarCmp } from './components/actionbar/actionbar.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        DashboardCmp,
        AuthCmp,
        ActionbarCmp
    ],
    providers: [
        DataService,
        NotificationService,
        AuthService,
        PlayerService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

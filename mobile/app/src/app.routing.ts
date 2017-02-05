import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { DashboardCmp } from './components/dashboard/dashboard.component';
import { AuthCmp } from './components/auth/auth.component';

const routes: Routes = [
  { path: '', component: AuthCmp },
  { path: 'dashboard', component: DashboardCmp },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

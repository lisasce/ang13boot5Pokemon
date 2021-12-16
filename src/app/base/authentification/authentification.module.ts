import { NgModule } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {LoginRoutingModule} from "./login-routing/login-routing.module";
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AuthentificationModule { }

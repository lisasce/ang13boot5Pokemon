import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;

  /*  const url : UrlTree = this.router.parseUrl('/login');
    url.queryParams = {
      redirectUrl: state.url
    };
    return this.authService.checkLogin() || url;*/


    // || caste links auf boolean, wenn false dann weiter mit rechts
// ?? "nullish coercion" nur wenn links === null|undefined|isNil dann rechts


  }

}

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(): Observable<boolean | UrlTree> {

    return this.authService.checkLogin$().pipe(
      tap( (isLoggedIn)=> isLoggedIn === false && this.router.navigate(['/login']) )
    );
  }

}

import { Injectable } from '@angular/core';
import {delay, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _isLoggedIn: boolean = false;

  constructor() { }

  public login(name: string, password: string): Observable<boolean> {
    const loggedIn: boolean = (name === 'pokeball' && password === 'pokeball');

    return of(loggedIn).pipe(
      delay(1000),
      tap(value => this._isLoggedIn = value)
    );
  }

  public  checkLogin(): boolean {
    return this._isLoggedIn;
  }

  public logout(): void {
    this._isLoggedIn = false;
  }

}

import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$ = new BehaviorSubject(false);

  public login$(name: string, password: string): Observable<boolean> {

    const loggedIn: boolean = (name === 'pokeball' && password === 'pokeball');

    return of(loggedIn).pipe(
      delay(1000), // do like you would wait for a real response from an auth service
      tap(isLoggedIn => this.isLoggedIn$.next(isLoggedIn))
    );
  }

  public checkLogin$(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
    // so it only becomes only an observable. so nobody can rewrite it from outside
  }


  public logout(): void {
    this.isLoggedIn$.next(false);
  }

}

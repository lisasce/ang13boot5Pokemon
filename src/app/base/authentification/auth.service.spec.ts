import {TestBed, waitForAsync} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {mergeMap} from "rxjs";

fdescribe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login on correct name and password', (done) => {
      // given
      const name = 'pokeball';
      const password = 'pokeball';
      // when
      service.login$(name, password).subscribe(
        // then
        (isLoggedIn) => {
          expect(isLoggedIn).toBeTruthy();
          done(); // inform manually iT that the async action is ready
        }
      );
    })

    it('should not login on incorrect name and password', waitForAsync(() => {
      // given
      const name = 'poke';
      const password = 'poke';
      // when
      service.login$(name, password).subscribe(
        // then
        (isLoggedIn) => {
          expect(isLoggedIn).toBeFalsy();
        }
      );
    }))

  })

 describe('checkLogin$', () => {
   it('should reflect login state as false by default', waitForAsync(() => {
     //given

     //when
     service.checkLogin$().subscribe(
       // then
       (isLoggedIn) => {
         expect(isLoggedIn).toBeFalsy();
       }
     )

   }))

   it('should reflect login state as true after successfull login', waitForAsync(() => {
     //given
     const name = 'pokeball';
     const password = 'pokeball';

     //when
     service.login$(name, password).pipe(
       mergeMap(() => service.checkLogin$())
     ).subscribe(
       // then
       (isLoggedIn) => {
         expect(isLoggedIn).toBeTruthy();
       }
     )

   }))

 })

});

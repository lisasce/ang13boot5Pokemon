import {TestBed, waitForAsync} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService = jasmine.createSpyObj('AuthService', ['checkLogin$']);

  let routeMock: any = {snapshot: {}};
  let routeStateMock: any = {snapshot: {}, url: 'pokemons/all'};

  let routerMock = {navigate: jasmine.createSpy('navigate')}

  beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthGuard,
          {provide: Router, useValue: routerMock},
          {provide: AuthService, useValue: authService}
        ],
        imports: [HttpClientTestingModule]
      }).compileComponents();

    })
  );

  beforeEach(() => {
    guard = TestBed.inject(AuthGuard);
  })

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {

    beforeEach(() => {
      authService.checkLogin$.and.returnValue(of(true));
    })

    it('should let pass authenticated user', () => {
      // given

      // when
      guard.canActivate().subscribe(
        // then
        (result) => {
          expect(result).toBeTrue();
        });
    })
  })

  describe('canActivate NOK', () => {

    beforeEach(() => {
      authService.checkLogin$.and.returnValue(of(false));
    })

    it('should redirect an unauthenticated user to the login route', () => {
      // given

      // when
      guard.canActivate().subscribe(
        // then
        (result) => {
          expect(result).toBeFalse();
          expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
        });
    })

  })
});

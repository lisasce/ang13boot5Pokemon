import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AuthGuard} from "../auth.guard";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormsModule} from "@angular/forms";
import {of} from "rxjs";

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authGuard = jasmine.createSpyObj('AuthGuard', ['canActivate']);
  let authService = jasmine.createSpyObj('AuthService', ['checkLogin$', 'login$']);
  const routerSpy = jasmine.createSpyObj(
    'Router',
    ['getCurrentNavigation', 'navigate']
  );


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: AuthService, useValue: authService},
        {provide: AuthGuard, useValue: authGuard}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    authService.login$.and.returnValue(of(true));
    authService.checkLogin$.and.returnValue(of(true));

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {


    it('should redirect after successfull login', () => {
      // given
      let user = {
        name: 'pokeball',
        password: 'pokeball'
      }

      const redirect = routerSpy.getCurrentNavigation()?.extractedUrl?.queryParams?.['redirectUrl'] || '/pokemons/all';
      // when
      component.login(user);

      // then
      expect(component.connectingStatus).toBeTrue();
      expect(routerSpy.navigate).toHaveBeenCalledWith([redirect]);

    });
  });


  describe('login failing', () => {

    it('should set password to "" ', () => {
      // given
      let user = {
        name: 'pokeball',
        password: 'poke'
      }
      authService.login$.and.returnValue(of(false));
      fixture.detectChanges();
      // when
      component.login(user);

      // then
      expect(component.connectingStatus).toBeFalse();
      expect(component.user.password).toBe('');

    });
  });


});

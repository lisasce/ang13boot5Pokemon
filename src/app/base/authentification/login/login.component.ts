import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {UserModel} from "../user-model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public message: string = 'You are not logged in. (pokeball/pokeball)';
  public user: UserModel = {
    name: '',
    password: ''
  }

  public connectingStatus = false;
  private subscription?: Subscription;

  constructor(public authService: AuthService, private router: Router) {
  }


  ngOnInit(): void {
    this.subscription = this.authService.checkLogin$().subscribe(
      (isLoggedIn) => this.setMessage(isLoggedIn)
    );
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public logout() {
    this.authService.logout();
  }

  public login(user: UserModel): void {
    this.connectingStatus = true;
    this.message = 'Connecting ...';
    this.authService.login$(user.name, user.password).subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
          const redirect = this.router.getCurrentNavigation()?.extractedUrl?.queryParams?.['redirectUrl'] || '/pokemons/all';
          this.router.navigate([redirect]);
        } else {
          this.connectingStatus = false;
          this.user.password = '';
        }
      });
  }

  private setMessage(isLoggedIn: boolean) {
    if (this.connectingStatus) {
      this.message = isLoggedIn ? 'You are connected.' : 'Name or Password incorrect.';
    }
  }

}

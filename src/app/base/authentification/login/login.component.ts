import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {UserModel} from "../user-model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public message: string = 'You are not logged in. (pokeball/pokeball)';
  public user: UserModel = {
    name: '',
    password: ''
  }

  public connectingStatus = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public setMessage() {
    this.message = this.authService.checkLogin$() ?
      'You are connected.' : 'Name or Password incorrect.';
  }

  public logout() {
    this.authService.logout();
    this.setMessage();
  }

  public login(user : UserModel) {
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
      this.setMessage();
    });
  }
}

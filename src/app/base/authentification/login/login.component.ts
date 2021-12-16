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
  authServiceCheckLogin= false;

  public message: string = 'You are not logged in. (pokeball/pokeball)';

  public user: UserModel = {
    name: '',
    password: ''
  }

  public connectingStatus = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    //
  }

  login(user : UserModel) {
    this.connectingStatus = true;
    console.log(this.user)
  }
}

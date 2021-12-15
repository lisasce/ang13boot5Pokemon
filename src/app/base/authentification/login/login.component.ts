import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authServiceCheckLogin= false;

  public message: string = 'You are not logged in. (pokeball/pokeball)';
  public name = '';
  public  password = '';
  public connectingStatus = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    //
  }

  login() {
    //
  }
}

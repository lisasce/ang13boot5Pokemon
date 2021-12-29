import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AuthService} from "../authentification/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public myTitle= '';
  public pokeball = 'https://cdn.pixabay.com/photo/2016/08/15/00/50/pokeball-1594373_960_720.png';
  public pokeballOpened = 'https://cdn.pixabay.com/photo/2019/11/18/15/46/pokemon-4635112_960_720.png';

  collapsed = true;
  constructor(public authService: AuthService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("My Pokemon Library");
    this.myTitle = this.titleService.getTitle();
  }

  goHome(): void {
    this.router.navigate(['/pokemons/all']);
  }

  logout(): void  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  login(): void  {
    this.router.navigate(['/login']);
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}

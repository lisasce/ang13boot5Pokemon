import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container text-center">
     <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png"
          alt="404">
      <h1>Hey, this page does not exist dude!</h1>
        <h1><strong>404</strong></h1>
        <a routerLink="/pokemons/all"
           class="btn btn-light">
         Back Home
        </a>
    </div>
  `
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit {
  pokemonsLoading = true;

  constructor() { }

  ngOnInit(): void {
  }

  search(value: string) {
    //
  }
}

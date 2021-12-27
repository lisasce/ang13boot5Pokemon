import { Component, OnInit } from '@angular/core';
import {PokemonModel} from "../../pokemonStucture/PokemonModel";
import {PokemonService} from "../../services/pokemon.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public pokemons: PokemonModel[] = [];

  constructor(private router: Router, private pokemonsService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void{
    this.pokemonsService.getPokemonList().subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
      },
      error: (error) => {
        console.error(error.message);
      }
    })
  }

  selectPokemon(pokemon: PokemonModel): void {
    console.log('pokemon selected ' + pokemon.name);
    const link = ['/pokemons', pokemon.id];
    this.router.navigate(link);
  }

  goToAdd(): void {
    console.log('Add a Pokemon');
    const link = ['/pokemons/new'];
    this.router.navigate(link);
  }


  checkList(pokemonsList: PokemonModel[]) {
    if (pokemonsList.length > 0){
      this.pokemons = pokemonsList;
    } else {
      this.getPokemons();
    }
  }
}

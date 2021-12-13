import { Injectable } from '@angular/core';
import {PokemonTypes} from "../pokemonStucture/pokemon-types";
import {PokemonModel} from "../pokemonStucture/PokemonModel";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

@Injectable() // peut recevoir d'autres dependences
export class PokemonService {

  constructor(private http: HttpClient) {  }

  private pokemonsUrl = 'api/pokemons';

  private log(log: string) {
    console.info(log);
  }

  newPokemon(
    id = null,
    hp = 45,
    cp = 25,
    name = "Random Name",
    picture = "https://cdn.pixabay.com/photo/2016/08/15/00/50/pokeball-1594373_960_720.png",
    types: Array<PokemonTypes> = [PokemonTypes.normal],
    created = new Date()
  ): PokemonModel {
    const pokemon: PokemonModel = {id, hp, cp, name, picture, types, created};
    return pokemon;
  }


  pokemonUrlGenerator():string{
    const num = (Math.floor(Math.random() * 893) + 13).toString().padStart(3,'0');
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${num}.png`;
  }

  idGenerator():number{
    return Math.floor(Math.random() * 893) + 13;
  }

}

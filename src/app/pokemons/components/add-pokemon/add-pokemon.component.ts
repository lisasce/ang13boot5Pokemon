import { Component, OnInit } from '@angular/core';
import {PokemonModel} from "../../pokemonStucture/PokemonModel";
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss']
})
export class AddPokemonComponent implements OnInit {
  public pokemon: PokemonModel | undefined;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemon = this.pokemonService.newPokemon(new Date());
  }

}

import { Component, OnInit } from '@angular/core';
import {PokemonModel} from "../../pokemonStucture/PokemonModel";
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss']
})
export class AddPokemonComponent implements OnInit {
  public pokemon: PokemonModel;

  constructor(private pokemonService: PokemonService) {
    this.pokemon = this.pokemonService.newPokemon(new Date());
  }

  ngOnInit(): void {

  }

}

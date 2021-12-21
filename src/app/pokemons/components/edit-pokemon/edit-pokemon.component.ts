import { Component, OnInit } from '@angular/core';
import {PokemonModel} from "../../pokemonStucture/PokemonModel";
import {PokemonService} from "../../services/pokemon.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.scss']
})
export class EditPokemonComponent implements OnInit {
  public pokemon?: PokemonModel;
  public pokemon_id = this.route.snapshot.params['id'];

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {
    this.pokemon_id = this.route.snapshot.params['id'];
    this.pokemonService.getPokemon(this.pokemon_id)
      .subscribe(pokemon => this.pokemon = pokemon);
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {PokemonModel} from "../../pokemonStucture/PokemonModel";
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonService} from "../../services/pokemon.service";


@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit {
  public pokemon: PokemonModel = this.pokemonService.createPokemon(new Date()); // default pokemon
  public pokemon_id = this.route.snapshot.params['id'];

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {
    this.pokemon_id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.pokemonService.getPokemon(this.pokemon_id)
      .subscribe(pokemon => this.pokemon = pokemon);
  }

  goBack() {
    this.pokemon = this.pokemonService.createPokemon(new Date());
    this.pokemon_id = 0;
    this.router.navigate(['/pokemons/all']);
  }

  goEdit(pokemon: PokemonModel) {
    const link = ['/pokemons/edit', pokemon.id]
    this.router.navigate(link);
  }

  goDelete(pokemon: PokemonModel) {
    this.pokemonService.deletePokemon(pokemon.id).subscribe(() => this.goBack());
  }
}

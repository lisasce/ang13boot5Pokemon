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

  private pokemons: PokemonModel[] = [];

  constructor(private router: Router, private pokemonsService: PokemonService) { }

  ngOnInit(): void {
  }

}

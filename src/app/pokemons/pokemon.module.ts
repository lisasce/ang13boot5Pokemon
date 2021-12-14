import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ListComponent} from "./components/list/list.component";

import {PokemonService} from "./services/pokemon.service";

import {PokemonsRoutingModule} from "./pokemons-routing.module";
import {FormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PokemonsRoutingModule
  ],
  providers: [PokemonService]
})
export class PokemonModule { }

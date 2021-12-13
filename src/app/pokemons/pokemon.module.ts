import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from "./components/list/list.component";
import {PokemonService} from "./services/pokemon.service";
import {PokemonsRoutingModule} from "./pokemons-routing.module";




@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule
  ],
  providers: [PokemonService]
})
export class PokemonModule { }

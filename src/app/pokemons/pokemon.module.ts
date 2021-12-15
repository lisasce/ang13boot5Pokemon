import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ListComponent} from "./components/list/list.component";

import {PokemonService} from "./services/pokemon.service";

import {PokemonsRoutingModule} from "./pokemons-routing.module";
import {FormsModule} from "@angular/forms";
import { AddPokemonComponent } from './components/add-pokemon/add-pokemon.component';
import { EditPokemonComponent } from './components/edit-pokemon/edit-pokemon.component';
import { DetailPokemonComponent } from './components/detail-pokemon/detail-pokemon.component';
import { FormTemplateComponent } from './components/form-template/form-template.component';
import { SearchPokemonComponent } from './components/search-pokemon/search-pokemon.component';




@NgModule({
  declarations: [
    ListComponent,
    AddPokemonComponent,
    EditPokemonComponent,
    DetailPokemonComponent,
    FormTemplateComponent,
    SearchPokemonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PokemonsRoutingModule
  ],
  providers: [PokemonService]
})
export class PokemonModule { }

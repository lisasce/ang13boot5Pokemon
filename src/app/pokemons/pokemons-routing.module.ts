import { NgModule } from '@angular/core';
import {ListComponent} from "./components/list/list.component";
import {RouterModule, Routes} from "@angular/router";
import {AddPokemonComponent} from "./components/add-pokemon/add-pokemon.component";
import {EditPokemonComponent} from "./components/edit-pokemon/edit-pokemon.component";
import {DetailPokemonComponent} from "./components/detail-pokemon/detail-pokemon.component";
import {AuthGuard} from "../base/authentification/auth.guard";

const pokemonsRoutes: Routes = [
  {
    path: 'pokemons',
    canActivate: [AuthGuard],
    children: [
      { path: 'all', component: ListComponent },
      { path: 'new', component: AddPokemonComponent },
      { path: 'edit/:id', component: EditPokemonComponent},
      { path: ':id', component: DetailPokemonComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(pokemonsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PokemonsRoutingModule { }

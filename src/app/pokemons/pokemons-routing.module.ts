import { NgModule } from '@angular/core';
import {ListComponent} from "./components/list/list.component";
import {RouterModule, Routes} from "@angular/router";

const pokemonsRoutes: Routes = [
  {
    path: 'pokemons',
    //canActivate: [AuthGuard],
    children: [
      { path: 'all', component: ListComponent },
      //{ path: 'new', component: AddPokemonComponent },

      //{ path: 'edit/:id', component: EditPokemonComponent},
     // { path: ':id', component: DetailPokemonComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(pokemonsRoutes)
    //ne pas utiliser forRoute dans un sous module
  ],
  exports: [
    RouterModule
  ]
})
export class PokemonsRoutingModule { }

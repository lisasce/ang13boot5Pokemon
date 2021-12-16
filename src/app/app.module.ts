import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InMemoryDataService} from "./pokemons/services/in-memory-data.service";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {PokemonModule} from "./pokemons/pokemon.module";
import {SharedModule} from "./base/shared.module";
import {AuthentificationModule} from "./base/authentification/authentification.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}), // option to define format returned
    PokemonModule,
    AuthentificationModule,
    AppRoutingModule // should be last otherwise: 404
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

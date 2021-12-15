import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './base/navbar/navbar.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {HttpClientModule} from "@angular/common/http";
import {InMemoryDataService} from "./pokemons/services/in-memory-data.service";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {FormsModule} from "@angular/forms";
import {PokemonModule} from "./pokemons/pokemon.module";
import { LoaderComponent } from './base/loader/loader.component';
import { LoginComponent } from './base/authentification/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoaderComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}), // option to define format returned
    NgbModule,
    PokemonModule,
    AppRoutingModule // si on met celle la avant on aura que du 404
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

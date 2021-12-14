import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PokemonsRoutingModule} from "./pokemons/pokemons-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {InMemoryDataService} from "./pokemons/services/in-memory-data.service";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
    NgbModule,
    PokemonsRoutingModule,
    AppRoutingModule // si on met celle la avant on aura que du 404
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PokemonsRoutingModule} from "./pokemons/pokemons-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    PokemonsRoutingModule,
    AppRoutingModule // si on met celle la avant on aura que du 404
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

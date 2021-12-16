import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from "../loader/loader.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    NavbarComponent,
    LoaderComponent,

    PageNotFoundComponent
  ],
  exports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NavbarComponent,
    LoaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ]
})
export class SharedModule { }

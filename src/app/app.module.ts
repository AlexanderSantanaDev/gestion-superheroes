// AppModule es el módulo raíz que inicializa la aplicación e importa otros módulos de funciones.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Añadir FormsModule
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/header/header.component'; // Importar HeaderComponent
import { HeroesModule } from './heroes/heroes.module';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, // Importar FormsModule
    HttpClientModule,
    HeroesModule, // Importar HeroesModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }// necesario para la navegacion en producción con el '#'
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
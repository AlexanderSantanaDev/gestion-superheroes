// CoreModule alberga componentes como HeaderComponent que se utilizan en toda la aplicación.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }

//HeroesModule agrupa componentes y servicios específicos para la gestión de héroes.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { RouterModule } from '@angular/router'; 
import { TitleCasePipe } from '@angular/common'; 
import { CapitalizePipe } from '../pipes/capitalize.pipe';

// Angular material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';





@NgModule({
  declarations: [
    HeroListComponent,
    HeroDetailComponent,
    ConfirmationDialogComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule, 
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatCardModule, 
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    TitleCasePipe 
  ]
})
export class HeroesModule { }
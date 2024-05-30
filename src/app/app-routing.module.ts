import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroes/new', component: HeroDetailComponent },
  { path: 'heroes/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
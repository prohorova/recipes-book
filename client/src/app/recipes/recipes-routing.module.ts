import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RecipesCreationComponent} from "./recipes-creation/recipes-creation.component";
import {RecipesEditionComponent} from "./recipes-edition/recipes-edition.component";
import {RecipesDetailsComponent} from "./recipes-details/recipes-details.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    component: RecipesCreationComponent
  },
  {
    path: 'view/:id',
    component: RecipesDetailsComponent
  },
  {
    path: 'edit/:id',
    component: RecipesEditionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }

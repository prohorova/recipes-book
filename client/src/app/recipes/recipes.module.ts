import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home/home.component";
import {RecipeFilterComponent} from "./home/recipe-filter/recipe-filter.component";
import {RecipesListComponent} from "./home/recipes-list/recipes-list.component";
import {RecipesCreationComponent} from "./recipes-creation/recipes-creation.component";
import {RecipesDetailsComponent} from "./recipes-details/recipes-details.component";
import {RecipesEditionComponent} from "./recipes-edition/recipes-edition.component";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import { RecipesFormComponent } from './recipes-form/recipes-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { RecipeComponent } from './home/recipes-list/recipe/recipe.component';
import { StoreModule } from '@ngrx/store';
import * as fromRecipes from './state/recipes.reducers';
import {EffectsModule} from "@ngrx/effects";
import {effects} from "./state/recipes.effects";



@NgModule({
  declarations: [
    HomeComponent,
    RecipeFilterComponent,
    RecipesListComponent,
    RecipesCreationComponent,
    RecipesDetailsComponent,
    RecipesEditionComponent,
    RecipesFormComponent,
    RecipeComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule,

    HttpClientModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(
      fromRecipes.recipesFeatureKey,
      fromRecipes.recipesReducer
    ),
    EffectsModule.forFeature(...effects)
  ]
})
export class RecipesModule { }

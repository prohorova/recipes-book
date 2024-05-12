import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../models/recipe.model";
import {Store} from "@ngrx/store";
import {
  recipeToUpdate,
  recipeToUpdateLoading,
  updateError,
  updateInProgress
} from "../state/recipes-edition/recipes-edition.selectors";
import * as RecipesEditionActions from "../state/recipes-edition/recipes-edition.actions";

@Component({
  selector: 'app-recipes-edition',
  templateUrl: './recipes-edition.component.html',
  styleUrl: './recipes-edition.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesEditionComponent {

  store = inject(Store);

  route = inject(ActivatedRoute);

  recipeToUpdateLoading$ = this.store.select(recipeToUpdateLoading);

  recipeToUpdate$ = this.store.select(recipeToUpdate);

  updateInProgress$ = this.store.select(updateInProgress);

  updateError$ = this.store.select(updateError);

  updateRecipe(recipe: Recipe, data: Partial<Recipe>) {
    const updatedRecipe = Object.assign({}, recipe, data);
    this.store.dispatch(RecipesEditionActions.updateRecipe({recipe: updatedRecipe}));
  }
}

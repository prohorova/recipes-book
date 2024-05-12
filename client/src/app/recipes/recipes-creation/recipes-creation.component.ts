import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Recipe} from "../models/recipe.model";
import {Store} from "@ngrx/store";
import * as RecipesCreationActions from '../state/recipes-creation/recipes-creation.actions';
import {creationError, creationInProgress} from "../state/recipes-creation/recipes-creation.selectors";

@Component({
  selector: 'app-recipes-creation',
  templateUrl: './recipes-creation.component.html',
  styleUrl: './recipes-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesCreationComponent {

  store = inject(Store);

  saving$ = this.store.select(creationInProgress);

  saveError$ = this.store.select(creationError);

  createRecipe(recipe: Partial<Recipe>) {
    this.store.dispatch(RecipesCreationActions.createRecipe({recipe: <Recipe>recipe}));
  }
}

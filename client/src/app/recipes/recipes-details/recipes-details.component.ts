import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {recipeDetails, recipeDetailsError, recipeDetailsLoading} from "../state/recipes-details/recipes-details.selectors";

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesDetailsComponent {

  store = inject(Store);

  recipe$ = this.store.select(recipeDetails);

  recipeError$ = this.store.select(recipeDetailsError);

  recipeLoading$ = this.store.select(recipeDetailsLoading);

}

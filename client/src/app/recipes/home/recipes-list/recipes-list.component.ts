import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {filteredRecipes, recipesLoading} from "../../state/home/home.selectors";
import {Recipe} from "../../models/recipe.model";
import * as HomeActions from '../../state/home/home.actions';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {

  store = inject(Store);

  recipes$ = this.store.select(filteredRecipes);

  loading$ = this.store.select(recipesLoading);

  ngOnInit() {
    this.store.dispatch(HomeActions.loadRecipes());
  }

  trackRecipes(index: number, recipe: Recipe) {
    return recipe._id;
  }

  onDelete(recipe: Recipe) {
    const id = recipe._id;
    if (id) {
      this.store.dispatch(HomeActions.deleteRecipe({id}));
    }
  }

}

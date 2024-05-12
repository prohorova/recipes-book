import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Recipe} from "../../models/recipe.model";
import {RecipeComponent} from "./recipe/recipe.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RecipesStore} from "../../recipes.state";

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [MatProgressSpinnerModule, RecipeComponent],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {

  readonly store = inject(RecipesStore);

  loading = this.store.recipesLoading;

  filteredRecipes = this.store.filteredRecipes;

  filter = this.store.filter;

  ngOnInit() {
    this.store.loadAllRecipes();
  }

  deleteRecipe(recipe: Recipe) {
    const id = recipe._id;
    if (id) {
      this.store.deleteRecipe(id);
    }
  }

}

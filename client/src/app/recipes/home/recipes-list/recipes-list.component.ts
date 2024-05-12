import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {BehaviorSubject, Subject, catchError, of, combineLatest, map, switchMap, filter, tap} from "rxjs";
import {Recipe} from "../../models/recipe.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {

  recipesService = inject(RecipesService);

  refreshList$ = new BehaviorSubject(true);

  recipes$ = this.refreshList$.pipe(
    switchMap(() => this.recipesService.getRecipesList()),
    catchError(() => of([]))
  );

  filter$ = this.recipesService.filterRecipesAction$;

  filteredRecipes$ = combineLatest([this.recipes$, this.filter$]).pipe(
    map(([recipes, filter]: [Recipe[], Partial<Recipe>]) => this.filterRecipes(recipes, filter))
  );

  deleteAction$ = new Subject<Recipe>();

  delete$ = this.deleteAction$.pipe(
    map((recipe: Recipe) => recipe._id),
    filter((id: string | undefined): id is string => !!id),
    switchMap((id: string) => this.recipesService.deleteRecipe(id)),
    tap(() => this.refreshList$.next(true))
  );

  trackRecipes(index: number, recipe: Recipe) {
    return recipe._id;
  }

  filterRecipes(recipes: Recipe[], filter: Partial<Recipe>) {
    return recipes.filter(recipe => {
      const hasTitle = filter.title ? recipe.title.toLowerCase().includes((filter.title || '').toLowerCase()) : true;
      const hasIngredient = filter.ingredients ? recipe.ingredients.toLowerCase().includes((filter.ingredients || '').toLowerCase()) : true;
      const hasCookTime = filter.cookTime ? recipe.cookTime === filter.cookTime : true;
      return hasTitle && hasIngredient && hasCookTime;
    })
  }

}

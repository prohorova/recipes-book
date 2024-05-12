import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {catchError, of, tap, EMPTY} from "rxjs";
import {Recipe} from "../../models/recipe.model";
import {RecipeComponent} from "./recipe/recipe.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [MatProgressSpinnerModule, RecipeComponent],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {

  recipesService = inject(RecipesService);

  destroyRef = inject(DestroyRef);

  loading = signal(false);

  recipes = signal<Recipe[]>([]);

  filter = this.recipesService.filter;

  filteredRecipes = computed(() => {
    const recipes = this.recipes();
    if (!recipes || !recipes.length) return [];
    return recipes.filter(recipe => {
      const hasTitle = this.filter().title ? recipe.title.toLowerCase().includes((this.filter().title || '').toLowerCase()) : true;
      const hasIngredient = this.filter().ingredients ? recipe.ingredients.toLowerCase().includes((this.filter().ingredients || '').toLowerCase()) : true;
      const hasCookTime = this.filter().cookTime ? recipe.cookTime === this.filter().cookTime : true;
      return hasTitle && hasIngredient && hasCookTime;
    })
  });

  ngOnInit() {
    this.loading.set(true);
    this.recipesService.getRecipesList().pipe(
      tap((recipes: Recipe[]) => {
        this.recipes.set(recipes);
        this.loading.set(false);
      }),
      catchError(() => of([])),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  deleteRecipe(recipe: Recipe) {
    const id = recipe._id;
    if (!id) return;
    this.recipesService.deleteRecipe(id).pipe(
      tap(() => {
        this.recipes.update((recipes: Recipe[]) => recipes.filter((recipe: Recipe) => recipe._id !== id));
      }),
      catchError(() => EMPTY),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}

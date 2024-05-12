import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NonNullableFormBuilder} from "@angular/forms";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe.model";
import {tap} from "rxjs";

@Component({
  selector: 'app-recipe-filter',
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFilterComponent {

  fb = inject(NonNullableFormBuilder);

  recipesService = inject(RecipesService);

  filterForm = this.fb.group({
    title: [''],
    ingredients: [''],
    cookTime: this.fb.control<number | undefined>(undefined)
  });

  filter$ = this.recipesService.filterRecipesAction$.pipe(
    tap((filter: Partial<Recipe>) => {
      this.filterForm.patchValue({
        title: filter.title,
        ingredients: filter.ingredients,
        cookTime: filter.cookTime
      })
    })
  );

  updateFilter() {
    this.recipesService.updateFilter(this.filterForm.value);
  }

  reset() {
    this.recipesService.updateFilter({});
  }

}

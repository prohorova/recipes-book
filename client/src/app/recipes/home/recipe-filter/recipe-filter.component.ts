import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {RecipesService} from "../../services/recipes.service";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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

  constructor() {
    effect(() => {
      const filter = this.recipesService.filter();
      this.filterForm.patchValue({
        title: filter.title,
        ingredients: filter.ingredients,
        cookTime: filter.cookTime
      })
    })
  }

  updateFilter() {
    this.recipesService.updateFilter(this.filterForm.value);
  }

  reset() {
    this.recipesService.updateFilter({});
  }

}

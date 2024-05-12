import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RecipesStore} from "../../recipes.state";

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

  readonly store = inject(RecipesStore);

  filterForm = this.fb.group({
    title: [''],
    ingredients: [''],
    cookTime: this.fb.control<number | undefined>(undefined)
  });

  constructor() {
    effect(() => {
      const filter = this.store.filter();
      this.filterForm.patchValue({
        title: filter.title,
        ingredients: filter.ingredients,
        cookTime: filter.cookTime
      })
    })
  }

  updateFilter() {
    this.store.updateFilter(this.filterForm.value);
  }

  reset() {
    this.store.updateFilter({});
  }

}

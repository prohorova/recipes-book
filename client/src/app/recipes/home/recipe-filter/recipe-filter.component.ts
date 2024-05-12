import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NonNullableFormBuilder} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as HomeActions from '../../state/home/home.actions';
import {Recipe} from "../../models/recipe.model";
import {filter} from "../../state/home/home.selectors";
import {tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-recipe-filter',
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFilterComponent {

  store = inject(Store);

  fb = inject(NonNullableFormBuilder);

  filter$ = this.store.select(filter);

  constructor() {
    this.filter$.pipe(
      tap((filter: Partial<Recipe>) => {
        this.filterForm.patchValue({
          title: filter.title,
          ingredients: filter.ingredients,
          cookTime: filter.cookTime
        })
      }),
      takeUntilDestroyed()
    ).subscribe();
  }


  filterForm = this.fb.group({
    title: [''],
    ingredients: [''],
    cookTime: this.fb.control<number | undefined>(undefined)
  });

  updateFilter(data: Partial<Recipe>) {
    this.store.dispatch(HomeActions.updateFilter({filter: data}));
  }

  reset() {
    this.store.dispatch(HomeActions.updateFilter({filter: {}}));
  }

}

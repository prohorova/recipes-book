import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipesStore} from "../recipes.state";

@Component({
  selector: 'app-recipes-details',
  standalone: true,
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesDetailsComponent {

  route = inject(ActivatedRoute);

  readonly store = inject(RecipesStore);

  recipe = this.store.recipe;

  error = this.store.recipeError;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.store.loadRecipe(id);
  }

}

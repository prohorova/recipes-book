import {ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../models/recipe.model";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RecipesFormComponent} from "../recipes-form/recipes-form.component";
import {RecipesStore} from "../recipes.state";

@Component({
  selector: 'app-recipes-edition',
  standalone: true,
  imports: [MatProgressSpinnerModule, RecipesFormComponent],
  templateUrl: './recipes-edition.component.html',
  styleUrl: './recipes-edition.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesEditionComponent {

  route = inject(ActivatedRoute);

  readonly store = inject(RecipesStore);

  recipe = this.store.recipeToUpdate;

  loading = this.store.recipeToUpdateLoading;

  saving = this.store.updateInProgress;

  error = this.store.updateError;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.store.loadRecipeToEdit(id);
  }

  save(recipe: Recipe) {
    this.store.editRecipe(Object.assign({_id: this.recipe()!._id, ...recipe}));
  }
}

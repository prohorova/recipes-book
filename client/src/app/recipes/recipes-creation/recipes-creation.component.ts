import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Recipe} from "../models/recipe.model";
import {RecipesFormComponent} from "../recipes-form/recipes-form.component";
import {RecipesStore} from "../recipes.state";

@Component({
  selector: 'app-recipes-creation',
  standalone: true,
  imports: [RecipesFormComponent],
  templateUrl: './recipes-creation.component.html',
  styleUrl: './recipes-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesCreationComponent {

  readonly store = inject(RecipesStore);

  saving = this.store.creationInProgress;

  error = this.store.creationError;

  save(data: Recipe) {
    this.store.saveRecipe(data);
  }

}

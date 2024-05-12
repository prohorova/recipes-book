import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {catchError, of, tap} from "rxjs";
import {RecipesService} from "../services/recipes.service";
import {Recipe} from "../models/recipe.model";
import {Router} from "@angular/router";
import {RecipesFormComponent} from "../recipes-form/recipes-form.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-recipes-creation',
  standalone: true,
  imports: [RecipesFormComponent],
  templateUrl: './recipes-creation.component.html',
  styleUrl: './recipes-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesCreationComponent {

  router = inject(Router);

  destroyRef = inject(DestroyRef);

  recipesService = inject(RecipesService);

  saving = signal(false);

  error = signal('');

  save(data: Recipe) {
    this.error.set('');
    this.saving.set(true);
    this.recipesService.saveRecipe(data).pipe(
      tap(() => {
        this.saving.set(false);
        this.router.navigateByUrl('recipes')
      }),
      catchError((err) => of(err).pipe(
        tap(() => {
          this.saving.set(false);
          this.error.set('There was an error saving a recipe');
        }),
      )),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe()
  }

}

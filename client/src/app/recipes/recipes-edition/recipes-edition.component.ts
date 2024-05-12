import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap, tap, catchError, of, filter, map} from "rxjs";
import {RecipesService} from "../services/recipes.service";
import {Recipe} from "../models/recipe.model";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RecipesFormComponent} from "../recipes-form/recipes-form.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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

  router = inject(Router);

  destroyRef = inject(DestroyRef);

  recipesService = inject(RecipesService);

  loading = signal(false);

  saving = signal(false);

  error = signal('');

  recipe = signal<Recipe | undefined>(undefined);

  ngOnInit() {
    this.route.params.pipe(
      map((params: Params) => params['id']),
      filter((id: string) => !!id),
      tap(() => this.loading.set(true)),
      switchMap((id: string) => this.recipesService.getRecipe(id)),
      tap((recipe: Recipe) => {
        this.loading.set(false);
        this.recipe.set(recipe)
      }),
      takeUntilDestroyed(this.destroyRef),
      catchError((err) => of(err).pipe(
        tap(() => {
          this.loading.set(false);
          this.error.set('Could not get recipe');
        })
      ))
    ).subscribe();
  }

  save(recipe: Recipe) {
    this.error.set('');
    this.saving.set(true);
    this.recipesService.editRecipe({_id: this.recipe()!._id, ...recipe}).pipe(
      tap(() => {
        this.saving.set(false);
        this.router.navigateByUrl('recipes')
      }),
      catchError((err) => of(err).pipe(
        tap(() => {
          this.saving.set(false);
          this.error.set('There was an error updating a recipe');
        }),
      )),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe()
  }
}

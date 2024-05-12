import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {RecipesService} from "../services/recipes.service";
import {ActivatedRoute, Params} from "@angular/router";
import {map, of, switchMap, tap, filter} from "rxjs";
import {catchError} from "rxjs/operators";
import {Recipe} from "../models/recipe.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-recipes-details',
  standalone: true,
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesDetailsComponent {

  route = inject(ActivatedRoute);

  recipesService = inject(RecipesService);

  destroyRef = inject(DestroyRef);

  loading = signal(false);

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

}

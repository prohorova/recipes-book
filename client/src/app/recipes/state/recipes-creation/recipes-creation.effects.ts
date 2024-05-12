import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {of, catchError, tap, exhaustMap, map} from "rxjs";
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import * as RecipesCreationActions from './recipes-creation.actions';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe.model";

@Injectable()
export class RecipesCreationEffects {

  router = inject(Router);

  store = inject(Store);

  actions$ = inject(Actions);

  recipesService = inject(RecipesService);

  createRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(RecipesCreationActions.createRecipe),
    exhaustMap(({recipe}) => this.recipesService.saveRecipe(recipe)
      .pipe(
        map((recipe: Recipe) => RecipesCreationActions.createRecipeSuccess({recipe})),
        tap(() => { this.router.navigateByUrl('recipes') }),
        catchError(() => of(RecipesCreationActions.createRecipeError({error: 'Could not create recipes-details'})))
      ))
    )
  );
}

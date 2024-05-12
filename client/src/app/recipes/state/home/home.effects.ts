import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as HomeActions from './home.actions';
import {EMPTY, of, catchError, tap, exhaustMap, map} from "rxjs";
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe.model";

@Injectable()
export class HomeEffects {

  router = inject(Router);

  store = inject(Store);

  actions$ = inject(Actions);

  recipesService = inject(RecipesService);

  loadRecipesList$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.loadRecipes),
    exhaustMap(() => this.recipesService.getRecipesList()
      .pipe(
        map((recipes: Recipe[]) => HomeActions.loadRecipesSuccess({recipes})),
        catchError(() => of(HomeActions.loadRecipesError({error: 'Could not load recipes'})))
      ))
    )
  );

  deleteRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(HomeActions.deleteRecipe),
    exhaustMap(({id}) => this.recipesService.deleteRecipe(id)
      .pipe(
        tap(() => this.store.dispatch(HomeActions.loadRecipes())),
        catchError(() => EMPTY)
      ))
    ), { dispatch: false }
  );

}

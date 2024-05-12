import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {of, catchError, tap, exhaustMap, map, filter} from "rxjs";
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import * as RecipesEditionActions from './recipes-edition.actions';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe.model";
import {routerNavigatedAction, SerializedRouterStateSnapshot} from "@ngrx/router-store";
import {UtilsService} from "../../services/utils.service";

@Injectable()
export class RecipesEditionEffects {

  router = inject(Router);

  store = inject(Store);

  utils = inject(UtilsService);

  actions$ = inject(Actions);

  recipesService = inject(RecipesService);

  navigationToEditRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerNavigatedAction),
        filter(({ payload }) => payload.routerState.url.includes('/recipes/edit')),
        map(({ payload }) => this.utils.getAllRouteParameters(payload.routerState).get('id')),
        filter((id) => !!id),
        map((id) => RecipesEditionActions.loadRecipeToUpdate({id}))
      )
  );

  loadRecipeToUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(RecipesEditionActions.loadRecipeToUpdate),
    exhaustMap(({id}) => this.recipesService.getRecipe(id)
      .pipe(
        map((recipe: Recipe) => RecipesEditionActions.loadRecipeToUpdateSuccess({recipe})),
        catchError(() => of(RecipesEditionActions.loadRecipeToUpdateError({error: 'Could not load recipes-details to update'})))
      ))
    )
  );

  updateRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(RecipesEditionActions.updateRecipe),
    exhaustMap(({recipe}) => this.recipesService.editRecipe(recipe)
      .pipe(
        map((recipe: Recipe) => RecipesEditionActions.updateRecipeSuccess({recipe})),
        tap(() => { this.router.navigateByUrl('recipes') }),
        catchError(() => of(RecipesEditionActions.updateRecipeError({error: 'Could not update recipes-details'})))
      ))
    )
  );

}

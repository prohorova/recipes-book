import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {of, catchError, exhaustMap, map, filter} from "rxjs";
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {routerNavigatedAction, RouterNavigatedPayload, SerializedRouterStateSnapshot} from "@ngrx/router-store";
import * as RecipesDetailsActions from '../../state/recipes-details/recipes-details.actions';
import {Recipe} from "../../models/recipe.model";
import {RecipesService} from "../../services/recipes.service";
import {UtilsService} from "../../services/utils.service";


@Injectable()
export class RecipesDetailsEffects {

  router = inject(Router);

  store = inject(Store);

  utils = inject(UtilsService);

  actions$ = inject(Actions);

  recipesService = inject(RecipesService);

  navigationToViewRecipeDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerNavigatedAction),
        filter(({ payload }) => payload.routerState.url.includes('/recipes/view')),
        map(({ payload }) => this.utils.getAllRouteParameters(payload.routerState).get('id')),
        filter((id) => !!id),
        map((id) => RecipesDetailsActions.loadRecipe({id}))
      )
  );

  loadRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(RecipesDetailsActions.loadRecipe),
    exhaustMap(({id}) => this.recipesService.getRecipe(id)
      .pipe(
        map((recipe: Recipe) => RecipesDetailsActions.loadRecipeSuccess({recipe})),
        catchError(() => of(RecipesDetailsActions.loadRecipeError({error: 'Could not load recipes-details'})))
      ))
    )
  );


}

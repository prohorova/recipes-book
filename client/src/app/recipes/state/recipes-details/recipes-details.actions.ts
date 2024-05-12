import {createAction, props} from "@ngrx/store";
import {Recipe} from "../../models/recipe.model";

export const loadRecipe = createAction(
  '[Recipe Details] Load recipe details',
  props<{id: string}>()
);

export const loadRecipeSuccess = createAction(
  '[Load Recipe Details Effect] Recipe details loaded successfully',
  props<{recipe: Recipe}>()
);

export const loadRecipeError = createAction(
  '[Load Recipe Details Effect] Error on loading recipe details',
  props<{error: string}>()
);

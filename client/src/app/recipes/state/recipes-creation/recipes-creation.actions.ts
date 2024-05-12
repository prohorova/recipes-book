import {createAction, props} from "@ngrx/store";
import {Recipe} from "../../models/recipe.model";

export const createRecipe = createAction(
  '[Create Recipe] Create new recipes-details',
  props<{recipe: Recipe}>()
);

export const createRecipeSuccess = createAction(
  '[Create Recipe Effect] Recipe created successfully',
  props<{recipe: Recipe}>()
);

export const createRecipeError = createAction(
  '[Create Recipe Effect] Recipe creation failed',
  props<{error: string}>()
);

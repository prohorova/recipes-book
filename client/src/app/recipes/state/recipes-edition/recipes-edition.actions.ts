import {createAction, props} from "@ngrx/store";
import {Recipe} from "../../models/recipe.model";

export const loadRecipeToUpdate = createAction(
  '[Update Recipe] Load recipes-details to update',
  props<{id: string}>()
);

export const loadRecipeToUpdateSuccess = createAction(
  '[Update Recipe Effect] Load recipes-details to update',
  props<{recipe: Recipe}>()
);

export const loadRecipeToUpdateError = createAction(
  '[Update Recipe Effect] Failed to load recipes-details',
  props<{error: string}>()
);

export const updateRecipe = createAction(
  '[Update Recipe] Update recipes-details',
  props<{recipe: Recipe}>()
);

export const updateRecipeSuccess = createAction(
  '[Update Recipe Effect] Recipe updated successfully',
  props<{recipe: Recipe}>()
);

export const updateRecipeError = createAction(
  '[Update Recipe Effect] Recipe update failed',
  props<{error: string}>()
);


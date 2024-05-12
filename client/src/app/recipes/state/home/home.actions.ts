import {createAction, props} from "@ngrx/store";
import {Recipe} from "../../models/recipe.model";

export const loadRecipes = createAction(
  '[Recipes List] Load recipes'
);

export const loadRecipesSuccess = createAction(
  '[Load Recipes Effect] Recipes loaded successfully',
  props<{recipes: Recipe[]}>()
);

export const loadRecipesError = createAction(
  '[Load Recipes Effect] Error on loading recipes',
  props<{error: string}>()
);

export const updateFilter = createAction(
  '[Recipes Filter] filter recipes',
  props<{filter: Partial<Recipe>}>()
);

export const deleteRecipe = createAction(
  '[Recipe] Delete Recipe',
  props<{id: string}>()
);

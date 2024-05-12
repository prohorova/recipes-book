import {Recipe} from "../../models/recipe.model";
import {createReducer, on} from "@ngrx/store";
import * as RecipeDetailsActions from "./recipes-details.actions";

export interface RecipeDetailsState {
  recipe: Recipe | undefined,
  recipeLoading: boolean,
  recipeError: string
}

export const initialRecipeDetailsState: RecipeDetailsState = {
  recipe: undefined,
  recipeLoading: false,
  recipeError: ''
};

export const recipeDetailsReducer = createReducer(
  initialRecipeDetailsState,
  on(RecipeDetailsActions.loadRecipe, (state) => {
    return {
      ...state,
      recipeLoading: true
    }
  }),
  on(RecipeDetailsActions.loadRecipeSuccess, (state, action) => {
    return {
      ...state,
      recipeLoading: false,
      recipe: action.recipe
    }
  })
);



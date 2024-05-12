import {
  createReducer,
  on
} from '@ngrx/store';
import * as RecipesEditionActions from "./recipes-edition.actions";
import {Recipe} from "../../models/recipe.model";

export interface RecipesEditionState {
  recipeToUpdateLoading: boolean,
  recipeToUpdate: Recipe | undefined,
  recipeToUpdateError: string,
  updateInProgress: boolean,
  updateError: string,
}

export const initialRecipesEditionState: RecipesEditionState = {
  recipeToUpdateLoading: false,
  recipeToUpdate: undefined,
  recipeToUpdateError: '',
  updateInProgress: false,
  updateError: ''
};

export const recipesEditionReducer = createReducer(
  initialRecipesEditionState,
  on(RecipesEditionActions.loadRecipeToUpdate, (state) => {
    return {
      ...state,
      recipeToUpdateLoading: true
    }
  }),
  on(RecipesEditionActions.loadRecipeToUpdateSuccess, (state, action) => {
    return {
      ...state,
      recipeToUpdateLoading: false,
      recipeToUpdate: action.recipe
    }
  }),
  on(RecipesEditionActions.loadRecipeToUpdateError, (state, action) => {
    return {
      ...state,
      recipeToUpdateLoading: false,
      recipeToUpdateError: action.error
    }
  }),
  on(RecipesEditionActions.updateRecipe, (state) => {
    return {
      ...state,
      updateInProgress: true
    }
  }),
  on(RecipesEditionActions.updateRecipeSuccess, (state) => {
    return {
      ...state,
      updateInProgress: false
    }
  }),
  on(RecipesEditionActions.updateRecipeError, (state) => {
    return {
      ...state,
      updateInProgress: false
    }
  })
);

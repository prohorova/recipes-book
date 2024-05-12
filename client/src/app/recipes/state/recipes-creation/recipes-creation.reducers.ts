import {
  createReducer,
  on
} from '@ngrx/store';
import * as RecipesCreationActions from "./recipes-creation.actions";

export interface RecipesCreationState {
  creationInProgress: boolean,
  creationError: string,
}

export const initialRecipesCreationState: RecipesCreationState = {
  creationInProgress: false,
  creationError: ''
};

export const recipesCreationReducer = createReducer(
  initialRecipesCreationState,
  on(RecipesCreationActions.createRecipe, (state) => {
    return {
      ...state,
      creationInProgress: true
    }
  }),
  on(RecipesCreationActions.createRecipeSuccess, (state) => {
    return {
      ...state,
      creationInProgress: false
    }
  }),
  on(RecipesCreationActions.createRecipeError, (state) => {
    return {
      ...state,
      creationInProgress: false
    }
  })
);

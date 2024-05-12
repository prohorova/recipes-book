import {Recipe} from "../../models/recipe.model";
import {createReducer, on} from "@ngrx/store";
import * as HomeActions from "./home.actions";

export interface HomeState {
  recipesList: Recipe[] | undefined,
  recipesLoading: boolean,
  filter: Partial<Recipe>
}

export const initialHomeState: HomeState = {
  recipesList: undefined,
  recipesLoading: false,
  filter: {}
};

export const homeReducer = createReducer(
  initialHomeState,
  on(HomeActions.loadRecipes, (state) => {
    return {
      ...state,
      recipesLoading: true
    }
  }),
  on(HomeActions.loadRecipesSuccess, (state, action) => {
    return {
      ...state,
      recipesList: action.recipes,
      recipesLoading: false
    }
  }),
  on(HomeActions.updateFilter, (state, action) => {
    return {
      ...state,
      filter: action.filter
    }
  }),
);



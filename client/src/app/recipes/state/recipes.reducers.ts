import {
  combineReducers
} from '@ngrx/store';
import {homeReducer, HomeState} from "./home/home.reducers";
import {
  recipesCreationReducer,
  RecipesCreationState
} from "./recipes-creation/recipes-creation.reducers";
import {
  recipesEditionReducer,
  RecipesEditionState
} from "./recipes-edition/recipes-edition.reducers";
import {
  recipeDetailsReducer,
  RecipeDetailsState
} from "./recipes-details/recipes-details.reducers";

export const recipesFeatureKey = 'recipes';

export interface RecipesState {
  home: HomeState,
  recipesCreation: RecipesCreationState,
  recipesEdition: RecipesEditionState,
  recipesDetails: RecipeDetailsState
}

export const recipesReducer = combineReducers({
  home: homeReducer,
  recipesCreation: recipesCreationReducer,
  recipesEdition: recipesEditionReducer,
  recipesDetails: recipeDetailsReducer
});

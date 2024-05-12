import {createSelector} from "@ngrx/store";
import {selectState} from "../recipes.selectors";

export const selectRecipeDetailsState = createSelector(selectState, state => state.recipesDetails);

export const recipeDetails = createSelector(selectRecipeDetailsState, state => state.recipe);

export const recipeDetailsLoading = createSelector(selectRecipeDetailsState, state => state.recipeLoading);

export const recipeDetailsError = createSelector(selectRecipeDetailsState, state => state.recipeError);

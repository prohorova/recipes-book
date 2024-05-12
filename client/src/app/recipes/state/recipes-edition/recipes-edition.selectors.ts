import {createSelector} from "@ngrx/store";
import {selectState} from "../recipes.selectors";

export const selectRecipesEditionState = createSelector(selectState, state => state.recipesEdition);

export const recipeToUpdate = createSelector(selectRecipesEditionState, state => state.recipeToUpdate);

export const recipeToUpdateLoading = createSelector(selectRecipesEditionState, state => state.recipeToUpdateLoading);

export const updateInProgress = createSelector(selectRecipesEditionState, state => state.updateInProgress);

export const updateError = createSelector(selectRecipesEditionState, state => state.updateError);

import {createSelector} from "@ngrx/store";
import {selectState} from "../recipes.selectors";

export const selectRecipesCreationState = createSelector(selectState, state => state.recipesCreation);

export const creationInProgress = createSelector(selectRecipesCreationState, state => state.creationInProgress);

export const creationError = createSelector(selectRecipesCreationState, state => state.creationError);

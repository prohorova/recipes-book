import {createSelector} from "@ngrx/store";
import {selectState} from "../recipes.selectors";

export const selectHomeState = createSelector(selectState, state => state.home);

export const filteredRecipes = createSelector(selectHomeState, state => {
  const recipes = state.recipesList;
  const filter = state.filter;
  return recipes && recipes.filter(recipe => {
    const hasTitle = filter.title ? recipe.title.toLowerCase().includes((filter.title || '').toLowerCase()) : true;
    const hasIngredient = filter.ingredients ? recipe.ingredients.toLowerCase().includes((filter.ingredients || '').toLowerCase()) : true;
    const hasCookTime = filter.cookTime ? recipe.cookTime === filter.cookTime : true;
    return hasTitle && hasIngredient && hasCookTime;
  })
});

export const filter = createSelector(selectHomeState, state => state.filter);

export const recipesLoading = createSelector(selectHomeState, state => state.recipesLoading);

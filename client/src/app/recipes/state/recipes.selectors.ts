import {createFeatureSelector} from "@ngrx/store";
import {recipesFeatureKey, RecipesState} from "./recipes.reducers";

export const selectState = createFeatureSelector<RecipesState>(recipesFeatureKey);

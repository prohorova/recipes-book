import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {routerReducer} from "@ngrx/router-store";


export interface State {}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

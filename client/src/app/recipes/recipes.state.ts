import {signalStore, withState, withMethods, withComputed, patchState} from '@ngrx/signals';
import {Recipe} from "./models/recipe.model";
import {RecipesService} from "./services/recipes.service";
import {computed, inject} from "@angular/core";
import {Router} from "@angular/router";

type RecipesState = {
  recipesList: Recipe[] | undefined,
  recipesLoading: boolean,
  filter: Partial<Recipe>,

  creationInProgress: boolean,
  creationError: string,

  recipe: Recipe | undefined,
  recipeLoading: boolean,
  recipeError: string,

  recipeToUpdateLoading: boolean,
  recipeToUpdate: Recipe | undefined,
  recipeToUpdateError: string,
  updateInProgress: boolean,
  updateError: string
}

const initialState: RecipesState = {
  recipesList: undefined,
  recipesLoading: false,
  filter: {},

  creationInProgress: false,
  creationError: '',

  recipe: undefined,
  recipeLoading: false,
  recipeError: '',

  recipeToUpdateLoading: false,
  recipeToUpdate: undefined,
  recipeToUpdateError: '',
  updateInProgress: false,
  updateError: ''
};

export const RecipesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, recipesService = inject(RecipesService), router = inject(Router)) => ({
    updateFilter(filter: Partial<Recipe>): void {
      patchState(store, { filter });
    },
    async loadAllRecipes(): Promise<void> {
      patchState(store, { recipesLoading: true });
      const recipes = await recipesService.getRecipesList();
      patchState(store, { recipesList: recipes, recipesLoading: false });
    },
    deleteRecipe(id: string): void {
      recipesService.deleteRecipe(id).then(() => {
        const recipesList = store.recipesList();
        patchState(store, { recipesList: recipesList && recipesList.filter(recipe => recipe._id !== id) });
      })
    },
    saveRecipe(recipe: Recipe): void {
      patchState(store, { creationInProgress: true });
      recipesService.saveRecipe(recipe).then(() => {
        patchState(store, { creationInProgress: false });
        router.navigateByUrl('recipes');
      }, (() => {
        patchState(store, { creationInProgress: false, creationError: 'Could not create recipe' });
      }))
    },
    loadRecipeToEdit(id: string) {
      patchState(store, { recipeToUpdateLoading: true });
      recipesService.getRecipe(id).then((recipe: Recipe) => {
        patchState(store, { recipeToUpdateLoading: false, recipeToUpdate: recipe });
      }, () => {
        patchState(store, { recipeToUpdateLoading: false, recipeToUpdateError: 'Could not load recipe' });
      })
    },
    editRecipe(recipe: Recipe): void {
      patchState(store, { updateInProgress: true });
      console.log(recipe)
      recipesService.editRecipe(recipe).then(() => {
        patchState(store, { updateInProgress: false });
        router.navigateByUrl('recipes');
      }, (() => {
        patchState(store, { updateInProgress: false, updateError: 'Could not edit recipe' });
      }))
    },
    loadRecipe(id: string): void {
      patchState(store, { recipeLoading: true });
      recipesService.getRecipe(id).then((recipe: Recipe) => {
        patchState(store, { recipeLoading: false, recipe });
      }, () => {
        patchState(store, { recipeLoading: false, recipeError: 'Could not load recipe' });
      })
    }
  })),
  withComputed(({recipesList, filter}) => ({
    filteredRecipes: computed(() => {
      const recipesVal = recipesList();
      const filterVal = filter();
      if (!recipesVal || !recipesVal.length) return [];
      return recipesVal.filter((recipe: Recipe) => {
        const hasTitle = filterVal.title ? recipe.title.toLowerCase().includes((filterVal.title || '').toLowerCase()) : true;
        const hasIngredient = filterVal.ingredients ? recipe.ingredients.toLowerCase().includes((filterVal.ingredients || '').toLowerCase()) : true;
        const hasCookTime = filterVal.cookTime ? recipe.cookTime === filterVal.cookTime : true;
        return hasTitle && hasIngredient && hasCookTime;
      })
    })
  }))
);




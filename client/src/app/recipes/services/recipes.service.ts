import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Recipe} from "../models/recipe.model";

@Injectable({
  providedIn: 'any'
})
export class RecipesService {

  baseUrl = 'http://localhost:3000/api';

  http = inject(HttpClient);

  getRecipesList(): Promise<Recipe[]> {
    return lastValueFrom(this.http.get<Recipe[]>(`${this.baseUrl}/recipes`));
  }

  getRecipe(id: string): Promise<Recipe> {
    return lastValueFrom(this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}`));
  }

  saveRecipe(recipe: Recipe): Promise<Recipe> {
    return lastValueFrom(this.http.post<Recipe>(`${this.baseUrl}/recipes`, recipe));
  }

  editRecipe(recipe: Recipe): Promise<Recipe> {
    return lastValueFrom(this.http.put<Recipe>(`${this.baseUrl}/recipes/${recipe._id}`, recipe));
  }

  deleteRecipe(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.baseUrl}/recipes/${id}`));
  }

}

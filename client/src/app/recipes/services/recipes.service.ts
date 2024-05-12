import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BehaviorSubject} from "rxjs";
import {Recipe} from "../models/recipe.model";

@Injectable({
  providedIn: 'any'
})
export class RecipesService {

  baseUrl = 'http://localhost:3000/api';

  http = inject(HttpClient);

  private filterRecipesSubject$ = new BehaviorSubject<Partial<Recipe>>({});

  public filterRecipesAction$ = this.filterRecipesSubject$.asObservable();

  getRecipesList(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes`);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}`);
  }

  saveRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes`, recipe);
  }

  editRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}/recipes/${recipe._id}`, recipe);
  }

  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/recipes/${id}`);
  }

  updateFilter(filter: Partial<Recipe>) {
    this.filterRecipesSubject$.next(filter);
  }


}

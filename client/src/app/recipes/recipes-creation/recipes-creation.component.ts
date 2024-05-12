import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  ignoreElements,
  map,
  of,
  repeat,
  share,
  Subject,
  switchMap,
  tap
} from "rxjs";
import {RecipesService} from "../services/recipes.service";
import {Recipe} from "../models/recipe.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipes-creation',
  templateUrl: './recipes-creation.component.html',
  styleUrl: './recipes-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesCreationComponent {

  router = inject(Router);

  recipesService = inject(RecipesService);

  saving$ = new BehaviorSubject(false);

  saveAction$ = new Subject<Partial<Recipe>>();

  save$ = this.saveAction$.pipe(
    tap(() => this.saving$.next(true)),
    filter((data: Partial<Recipe>): data is Recipe => !!(data)),
    switchMap((data: Recipe) => this.recipesService.saveRecipe(data)),
    tap(() => {
      this.saving$.next(true);
      this.router.navigateByUrl('recipes')
    }),
    finalize(() => this.saving$.next(false)),
    share()
  );

  saveError$ = this.save$.pipe(
    ignoreElements(),
    catchError((err: HttpErrorResponse) => of(err)),
    map(() => 'There was an error saving a recipe'),
    repeat()
  );

}

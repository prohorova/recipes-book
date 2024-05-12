import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BehaviorSubject, Subject, switchMap, tap, catchError, of, filter, finalize, ignoreElements, map, share, repeat} from "rxjs";
import {RecipesService} from "../services/recipes.service";
import {Recipe} from "../models/recipe.model";
import {HttpErrorResponse} from "@angular/common/http";
import {withLatestFrom} from "rxjs/operators";

@Component({
  selector: 'app-recipes-edition',
  templateUrl: './recipes-edition.component.html',
  styleUrl: './recipes-edition.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesEditionComponent {

  route = inject(ActivatedRoute);

  router = inject(Router);

  recipesService = inject(RecipesService);

  loading$ = new BehaviorSubject(false);

  saving$ = new BehaviorSubject(false);

  saveAction$ = new Subject<Partial<Recipe>>();

  recipe$ = this.route.params.pipe(
    map((params: Params) => params['id']),
    filter((id: string) => !!id),
    tap(() => this.loading$.next(true)),
    switchMap((id: string) => this.recipesService.getRecipe(id)),
    tap(() => this.loading$.next(false)),
    finalize(() => this.loading$.next(false)),
  );

  save$ = this.saveAction$.pipe(
    tap(() => this.saving$.next(true)),
    filter((data: Partial<Recipe>): data is Recipe => !!(data)),
    withLatestFrom(this.recipe$),
    switchMap(([data, recipe]) => this.recipesService.editRecipe({_id: recipe._id, ...data})),
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
    map(() => 'There was an error updating a recipe'),
    repeat()
  );
}

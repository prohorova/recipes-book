import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RecipesService} from "../services/recipes.service";
import {ActivatedRoute, Params} from "@angular/router";
import {BehaviorSubject, finalize, map, of, share, switchMap, tap} from "rxjs";
import {catchError, ignoreElements} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesDetailsComponent {

  route = inject(ActivatedRoute);

  recipesService = inject(RecipesService);

  loading$ = new BehaviorSubject(false);

  recipe$ = this.route.params.pipe(
    map((params: Params) => params['id']),
    tap(() => this.loading$.next(true)),
    switchMap((id: string) => this.recipesService.getRecipe(id)),
    tap(() => this.loading$.next(false)),
    finalize(() => this.loading$.next(false)),
    share()
  );

  recipesError$ = this.recipe$.pipe(
    ignoreElements(),
    catchError((err: HttpErrorResponse) => of(err)),
    map(() => 'Could not get recipe')
  );

}

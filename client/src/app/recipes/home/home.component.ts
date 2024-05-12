import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RecipeFilterComponent} from "./recipe-filter/recipe-filter.component";
import {RecipesListComponent} from "./recipes-list/recipes-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeFilterComponent, RecipesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}

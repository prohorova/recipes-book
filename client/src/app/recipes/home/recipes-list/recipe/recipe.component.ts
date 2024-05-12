import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {RouterLink} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent {

  recipe = input.required<Recipe>();

  delete = output<Recipe>();

}

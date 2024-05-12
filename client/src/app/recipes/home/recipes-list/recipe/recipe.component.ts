import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent {

  @Input() recipe: Recipe | undefined;

  @Output() delete = new EventEmitter<Recipe>();

}

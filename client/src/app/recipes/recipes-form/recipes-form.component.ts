import {ChangeDetectionStrategy, Component, effect, inject, input, output} from '@angular/core';
import {Location} from '@angular/common'
import {Recipe} from "../models/recipe.model";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-recipes-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './recipes-form.component.html',
  styleUrl: './recipes-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesFormComponent {

  recipe = input<Recipe>();

  saving = input<boolean>(false);

  save = output<Recipe>();

  location = inject(Location);

  fb = inject(NonNullableFormBuilder);

  recipeForm = this.fb.group({
    title: ['', Validators.required],
    ingredients: ['', Validators.required],
    cookTime: this.fb.control<number | undefined>(undefined,
      Validators.compose([Validators.required, Validators.min(1)])),
    servings: this.fb.control<number | undefined>(undefined,
      Validators.compose([Validators.required, Validators.min(1)])),
    instructions: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const recipe = this.recipe();
      if (recipe) {
        this.recipeForm.patchValue({
          title: recipe.title,
          ingredients: recipe.ingredients,
          cookTime: recipe.cookTime,
          servings: recipe.servings,
          instructions: recipe.instructions,
        });
      }
    })
  }

  goBack() {
    this.location.back();
  }

  saveChanges() {
    if (this.recipeForm.valid) {
      this.save.emit(this.recipeForm.value as Recipe);
    }
  }

}

import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Location} from '@angular/common'
import {Recipe} from "../models/recipe.model";
import {NonNullableFormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrl: './recipes-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesFormComponent {

  @Input() recipe?: Recipe | null;

  @Input() saving: boolean = false;

  @Output() save = new EventEmitter();

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

  ngOnChanges() {
    this.recipeForm.patchValue({
      title: this.recipe?.title,
      ingredients: this.recipe?.ingredients,
      cookTime: this.recipe?.cookTime,
      servings: this.recipe?.servings,
      instructions: this.recipe?.instructions,
    });
  }

  goBack() {
    this.location.back();
  }

}

import {ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';

import { RecipeComponent } from './recipe.component';
import {By} from "@angular/platform-browser";
import {MatCardModule} from "@angular/material/card";
import {RouterTestingModule} from "@angular/router/testing";
import {Recipe} from "../../../models/recipe.model";
import {Router} from "@angular/router";
import {RecipesEditionComponent} from "../../../recipes-edition/recipes-edition.component";

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;

  const recipe: Recipe = {
    _id: '1',
    title: 'Recipe title',
    ingredients: 'Ingredient 1, ingredient 2',
    cookTime: 10,
    servings: 2,
    instructions: 'Instruction 1, instruction 2, instruction 3'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeComponent],
      imports: [
        RouterTestingModule.withRoutes(
          [
            {path: 'recipes/edit/:id', component: RecipesEditionComponent},
            {path: 'recipes/:id', component: RecipeComponent}
          ]
        ),
        MatCardModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render recipe title', () => {
    fixture.componentRef.setInput('recipe', recipe);
    fixture.detectChanges();
    const titleDe = fixture.debugElement.query(By.css('[data-testid="title"]'));
    expect(titleDe.nativeElement.textContent).toEqual(recipe.title);
  });

  it('should render image placeholder if recipe does not have an image', () => {
    const imagePlaceholder = 'assets/img/placeholder.jpg';
    fixture.componentRef.setInput('recipe', recipe);
    fixture.detectChanges();
    const imageDe = fixture.debugElement.query(By.css('[data-testid="image"]'));
    expect(imageDe.nativeElement.src).toContain(imagePlaceholder);
  });

  it('should render recipe image', () => {
    const recipeWithImage = Object.assign({}, recipe, {imageUrl: 'imageUrl'});
    fixture.componentRef.setInput('recipe', recipeWithImage);
    fixture.detectChanges();
    const imageDe = fixture.debugElement.query(By.css('[data-testid="image"]'));
    expect(imageDe.nativeElement.src).toContain(recipeWithImage.imageUrl);
  });

  it('should redirect to recipe edit page', fakeAsync(() => {
    fixture.componentRef.setInput('recipe', recipe);
    fixture.detectChanges();
    const editBtnDe = fixture.debugElement.query(By.css('[data-testid="edit-btn"]'));
    editBtnDe.nativeElement.click();
    tick();
    expect(TestBed.inject(Router).url).toEqual('/recipes/edit/' + recipe._id);
  }));

  it('should redirect to recipe details page', fakeAsync(() => {
    fixture.componentRef.setInput('recipe', recipe);
    fixture.detectChanges();
    const viewBtnDe = fixture.debugElement.query(By.css('[data-testid="view-btn"]'));
    viewBtnDe.nativeElement.click();
    tick();
    expect(TestBed.inject(Router).url).toEqual('/recipes/' + recipe._id);
  }));

  it('should emit delete event', () => {
    fixture.componentRef.setInput('recipe', recipe);
    fixture.detectChanges();
    const deleteBtnDe = fixture.debugElement.query(By.css('[data-testid="delete-btn"]'));
    deleteBtnDe.nativeElement.click();
    component.delete.subscribe((recipe: Recipe) => expect(recipe).toBe(recipe));
  });

});

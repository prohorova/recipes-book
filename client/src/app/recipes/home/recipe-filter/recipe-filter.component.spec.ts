import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFilterComponent } from './recipe-filter.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RecipesService} from "../../services/recipes.service";
import {noop} from "rxjs";
import {By} from "@angular/platform-browser";

describe('RecipeFilterComponent', () => {
  let component: RecipeFilterComponent;
  let fixture: ComponentFixture<RecipeFilterComponent>;

  const recipesService = jasmine.createSpyObj<RecipesService>(
    'RecipesService',
    {
      updateFilter: noop()
    });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeFilterComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [{provide: RecipesService, useValue: recipesService}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update filter on form submission', () => {
    const filterValue = {
      title: "Recipe",
      ingredients: "Ingredient 1, ingredient 2",
      cookTime: 10
    };
    component.filterForm.setValue(filterValue);
    const formDe = fixture.debugElement.query(By.css('[data-testid="filter-form"]'));
    formDe.triggerEventHandler('submit');
    expect(TestBed.inject(RecipesService).updateFilter).toHaveBeenCalledWith(filterValue);
  })
});

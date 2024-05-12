import {ComponentFixture, TestBed} from '@angular/core/testing';

import { RecipesListComponent } from './recipes-list.component';
import {Recipe} from "../../models/recipe.model";
import {RecipesService} from "../../services/recipes.service";
import {defer} from "rxjs";
import {BehaviorSubject} from "rxjs";

const recipes: Recipe[] = [
  {
    _id: '0',
    title: 'Recipe 1',
    ingredients: 'Ing 1, ing 2',
    cookTime: 10,
    servings: 2,
    instructions: 'Instructions on how to cook 1',
  },
  {
    _id: '1',
    title: 'Recipe 2',
    ingredients: 'Ing 21, ing 22',
    cookTime: 10,
    servings: 2,
    instructions: 'Instructions on how to cook 2',
  },
  {
    _id: '2',
    title: 'Recipe 3',
    ingredients: 'Ing 31, ing 32',
    cookTime: 20,
    servings: 4,
    instructions: 'Instructions on how to cook 3',
  },
  {
    _id: '2',
    title: 'To be filtered out',
    ingredients: 'Ing 41, ing 42',
    cookTime: 20,
    servings: 4,
    instructions: 'Instructions on how to cook 4',
  }
];

class MockRecipesService {
  private filterRecipesSubject$ = new BehaviorSubject<Partial<Recipe>>({});

  public filterRecipesAction$ = this.filterRecipesSubject$.toPromise();

  getRecipesList() {
    return defer(() => Promise.resolve(recipes));
  }

  updateFilter(filter: Partial<Recipe>) {
    this.filterRecipesSubject$.next(filter);
  }
}

describe('RecipesListComponent', () => {
  let component: RecipesListComponent;
  let fixture: ComponentFixture<RecipesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesListComponent],
      imports: [],
      providers: [{provide: RecipesService, useClass: MockRecipesService}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get recipes from service',() => {
    fixture.detectChanges();
    component.recipes$.subscribe((data: Recipe[]) => {
      expect(data).toEqual(recipes);
    })
  });

  it('should render recipes', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const recipesRows = fixture.nativeElement.querySelectorAll('app-recipe');
      expect(recipesRows.length).toEqual(recipes.length);
    })
  });

  it('should filter recipes', () => {
    const filter = {
      title: 'Recipe'
    };
    const service = TestBed.inject(RecipesService);
    service.updateFilter(filter);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const recipesRows = fixture.nativeElement.querySelectorAll('app-recipe');
      expect(recipesRows.length).toEqual(recipes.length - 1);
    })
  });

});

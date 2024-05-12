import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesCreationComponent } from './recipes-creation.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RecipesFormComponent} from "../recipes-form/recipes-form.component";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('RecipesCreationComponent', () => {
  let component: RecipesCreationComponent;
  let fixture: ComponentFixture<RecipesCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesCreationComponent, RecipesFormComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

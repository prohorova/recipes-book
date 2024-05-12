import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesFormComponent } from './recipes-form.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('RecipesFormComponent', () => {
  let component: RecipesFormComponent;
  let fixture: ComponentFixture<RecipesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesFormComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesEditionComponent } from './recipes-edition.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingHarness, RouterTestingModule} from "@angular/router/testing";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

describe('RecipesEditionComponent', () => {
  let component: RecipesEditionComponent;
  let fixture: ComponentFixture<RecipesEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesEditionComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

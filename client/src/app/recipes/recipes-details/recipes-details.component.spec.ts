import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesDetailsComponent } from './recipes-details.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RecipesDetailsComponent', () => {
  let component: RecipesDetailsComponent;
  let fixture: ComponentFixture<RecipesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

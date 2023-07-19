import { Component } from '@angular/core';
import { Recipe } from './recipes.modal';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  recipeSelected?: Recipe;

  constructor() {}

  ngOnInit(): void {
    
  }
}

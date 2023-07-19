
import { Component, Input} from '@angular/core';
import { Recipe } from '../../recipes.modal';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipeObj? : Recipe;
  @Input() index?: number;

  constructor(private _recipeService:RecipeService) {}
}

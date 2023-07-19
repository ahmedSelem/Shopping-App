import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipes.modal';
import { Ingerdient } from '../shared/ingerdients.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'banana',
  //     'Description',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
  //     [
  //       new Ingerdient('First Ingerdient', 1),
  //       new Ingerdient('second Ingerdient', 18),
  //     ]
  //   ),
  //   new Recipe(
  //     'tomato',
  //     'Description',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
  //     [
  //       new Ingerdient('First Ingerdient', 10),
  //       new Ingerdient('second Ingerdient', 15),
  //     ]
  //   ),
  // ];

  private recipes : Recipe [] = [];

  constructor(private _shoppingListService : ShoppinglistService) {}

  setRecipe(newRecipe : Recipe[]) {
    this.recipes = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipeList(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id:number) : Recipe {
    return this.recipes[id];
  }

  addIngerdToShopingList(ingerdients : Ingerdient[]) {
    this._shoppingListService.ingerdientListAdded(ingerdients);
  }

  addRecipe(newRecipe : Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index : number , newRecipe : Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

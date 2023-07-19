import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.modal';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private _httpClient: HttpClient,
    private _recipService: RecipeService,
    private _authService: AuthService
  ) {}

  saveData() {
    const recipeList: Recipe[] = this._recipService.getRecipeList();
    this._httpClient
      .put(
        'https://ng-recipe-project-41ab3-default-rtdb.firebaseio.com/recipes.json',
        recipeList
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchData() {
    return this._httpClient
      .get<Recipe[]>(
        'https://ng-recipe-project-41ab3-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingerdient: recipe.ingerdient ? recipe.ingerdient : [],
            };
          });
        }),
        tap((response) => {
          this._recipService.setRecipe(response);
        })
      );
  }
}

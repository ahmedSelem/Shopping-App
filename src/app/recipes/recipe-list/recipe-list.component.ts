import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from './../recipes.modal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes?: Recipe [];
  subscription? : Subscription;
  constructor(private _recipeService: RecipeService, private _router : Router,
    private _activateRoute : ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this._recipeService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
    });
     this.recipes = this._recipeService.getRecipeList();
  }
  newRecipe () {
    this._router.navigate(['new'], {relativeTo: this._activateRoute});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.modal';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit{
  recipeObj?: Recipe;
  id? : number;

  constructor(private _recipeService: RecipeService, 
    private _activatedRoute: ActivatedRoute,
    private _router : Router) {}
  
  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
       this.recipeObj = this._recipeService.getRecipeById(this.id);
      }
    )
  }

  onAddIngerdToShopingList() {
    if (this.recipeObj?.ingerdient)
      this._recipeService.addIngerdToShopingList(this.recipeObj?.ingerdient);
  }

  onEditRecipe() {
    this._router.navigate(['edit'], {relativeTo: this._activatedRoute});
  }

  onDeleteRecipe() {
    this._recipeService.deleteRecipe(this.id!);
    this._router.navigate(['../'], {relativeTo: this._activatedRoute});
  }
}

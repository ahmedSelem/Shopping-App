import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from '@angular/core';
import { Observable } from "rxjs";

import { Recipe } from "./recipes.modal";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

export const RecipesResolverServices : ResolveFn<Recipe[]> = 
(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    _dataStorageServices = inject(DataStorageService),
    _recipeServices = inject(RecipeService)
) : Observable<Recipe[]> | Recipe[] => {
    const recipes : Recipe[] = _recipeServices.getRecipeList();
    console.log(recipes.length);
    
    if (recipes.length === 0) {
        return _dataStorageServices.fetchData()
    } else {
        return recipes;
    }
}   
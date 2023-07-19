import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.modal';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id?: number;
  editMode: boolean = false;
  recipeForm?: FormGroup;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _recipeService: RecipeService,
    private _router : Router
  ) {}

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm?.get('ingerdient')).controls;
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.formInit();
    });
  }

  onSubmit() {
    if (this.editMode) {   
      this._recipeService.updateRecipe(this.id!, this.recipeForm?.value);
    } else {
      this._recipeService.addRecipe(this.recipeForm?.value);
    }
    this.onCancel();
  }

  onCancel () {
    this._router.navigate(['../'], {relativeTo: this._activatedRoute});
  }

  onDeleteIngerdient(index : number) {
    (<FormArray>this.recipeForm?.get('ingerdient')).removeAt(index);
  }

  addNewIngerdient() {
    if (this.recipeForm != null) {
      (<FormArray>this.recipeForm?.get('ingerdient')).push(
        new FormGroup({
          name: new FormControl(null, Validators.required,),
          amount: new FormControl(null, [
            Validators.required,
            Validators.pattern('^[1-9][0-9]*$'),
          ]),
        })
      );
    }
  }

  private formInit() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDesc = '';
    let recipeIngerdients = new FormArray<FormGroup>([]);

    if (this.editMode && this.id != null) {
      const recipeEdit = this._recipeService.getRecipeById(this.id);
      recipeName = recipeEdit.name;
      recipeImg = recipeEdit.imagePath;
      recipeDesc = recipeEdit.description;

      if (recipeEdit['ingerdient']) {
        for (let ingerdient of recipeEdit.ingerdient) {
          recipeIngerdients.push(
            new FormGroup({
              name: new FormControl(ingerdient.name, Validators.required),
              amount: new FormControl(ingerdient.amount, [
                Validators.required,
                Validators.pattern('^[1-9][0-9]*$'),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImg, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      ingerdient: recipeIngerdients,
    });
  }
}

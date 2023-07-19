import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingerdient } from 'src/app/shared/ingerdients.model';
import { ShoppinglistService } from 'src/app/shopping-list/shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm? : NgForm;
  editMode : boolean = false;
  editedItemIndex : number = 0;
  editedItem? : Ingerdient;

  constructor(private _shoppingListService : ShoppinglistService) {}

  ngOnInit () {
    this._shoppingListService.startedEdited.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this._shoppingListService.getIngerdientByIndex(this.editedItemIndex);
      this.slForm?.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    })
  }
  
  onSubmitIngerdient(form : NgForm) {
    const formValue = form.value;
    const newIngerdient = new Ingerdient(formValue.name, formValue.amount);
    if (this.editMode) {
      this._shoppingListService.ingerdientEdited(this.editedItemIndex, newIngerdient);
    } else {
      this._shoppingListService.ingerdientAdded(newIngerdient);
    }
    this.editMode = false;
    this.slForm?.reset();
  }

  onDelete() {
    this._shoppingListService.ingerdientDelete(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.slForm?.reset();
    this.editMode = false;
  }


  
}

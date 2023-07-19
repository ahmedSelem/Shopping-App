import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingerdient } from '../shared/ingerdients.model';
import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  ingerdientsList : Ingerdient[] = [];
  subscribtion? : Subscription;
  
  constructor(private _shoppingListService : ShoppinglistService) {}


  ngOnInit(): void {
    this.ingerdientsList = this._shoppingListService.getIngerdients();
    this.subscribtion = this._shoppingListService.ingerdientChanged.subscribe((ingerdients : Ingerdient []) => {
      this.ingerdientsList = ingerdients;
    })
  }

  onSelectedInger(index : number) {
    this._shoppingListService.getIndexClicked(index);
  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }


}

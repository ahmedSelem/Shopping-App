import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingerdient } from '../shared/ingerdients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  ingerdientChanged = new Subject<Ingerdient[]>();
  startedEdited = new Subject<number>();
  
  private ingerdientsList: Ingerdient[] = [
    new Ingerdient('Banana', 20),
    new Ingerdient('Tomato', 10),
  ];

  getIngerdients () : Ingerdient[] {
    return this.ingerdientsList.slice();
  }
  getIndexClicked(index : number) {
    this.startedEdited.next(index);
  }
  getIngerdientByIndex(index : number) : Ingerdient {
    return this.ingerdientsList[index];
  }

  ingerdientAdded (ingerdient : Ingerdient) {
    this.ingerdientsList.push(ingerdient);
    this.ingerdientChanged.next(this.ingerdientsList.slice());
  }
  ingerdientEdited (index : number, newIngerdient : Ingerdient) {
    this.ingerdientsList[index] = newIngerdient;
    this.ingerdientChanged.next(this.ingerdientsList.slice());
  }
  ingerdientDelete(index : number) {
    this.ingerdientsList.splice(index, 1);
    this.ingerdientChanged.next(this.ingerdientsList.slice());
  }


  ingerdientListAdded(ingerdList : Ingerdient []) {
    // for (let ingerdient of ingerdList) {
    //   this.ingerdientsList.push(ingerdient);
    // }
    this.ingerdientsList.push(...ingerdList);
    this.ingerdientChanged.next(this.ingerdientsList.slice());
  }

}

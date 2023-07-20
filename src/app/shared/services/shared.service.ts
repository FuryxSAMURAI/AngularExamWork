import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  itemCount: number = 0;

  itemCountUpdated: EventEmitter<number> = new EventEmitter<number>();

  getItemCount() {
    return this.itemCount;
  }

  updateItemCount(count: number) {
    this.itemCount = count;
    this.itemCountUpdated.emit(this.itemCount);
  }

  
  


}


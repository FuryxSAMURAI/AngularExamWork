import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private addedProducts: any[] = [];

  constructor() {}

  getAddedProducts(): any[] {
    return this.addedProducts;
  }

  addProduct(product: any) {
    this.addedProducts.push(product);
  }
}

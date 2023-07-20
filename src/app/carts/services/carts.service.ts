import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  cartProducts:any[] = []

  addCartProduct(cartImg:string, cartName:string, cartPrice:number){
    console.log(this.cartProducts);
    
    this.cartProducts.push({image:cartImg,title:cartName, price:cartPrice, quantity:1})
   }
   getLength(){
    return this.cartProducts.length
   }
   getCartProducts(){
    return this.cartProducts
   }

}

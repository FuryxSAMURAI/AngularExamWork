import { Component, Input, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
 cartProducts: any[] = [];
 total:any = 0;    

  constructor(
    private cartsService: CartsService) {}

  ngOnInit(): void {
     this.getCartProducts()     
   }

  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);      
   }   
  //  console.log(this.cartProducts) 
    this.getCartTotal()
  }
  

  addAmount(index: number){
    this.cartProducts[index].quantity++; // Увеличиваем количество выбранного товара на 1

    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  minsAmount(index: number){
    if (this.cartProducts[index].quantity > 0) {
      this.cartProducts[index].quantity--;
      this.getCartTotal();
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
  }

  detectChange(){
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  deleteProduct(index: number){
    window.location.reload();
    this.cartProducts.splice(index, 1)
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  clearCart(){
    window.location.reload();
    this.cartProducts = []
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  //таблица в корзине
  getCartTotal() {
    this.total = 0
    for(let x in this.cartProducts){
      this.total += this.cartProducts[x].price * this.cartProducts[x].quantity;
    }
  }


}

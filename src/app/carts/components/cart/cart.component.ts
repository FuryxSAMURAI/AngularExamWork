import { Component, OnInit } from '@angular/core';
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
    private cartService : CartsService
   ) {
    }
   ngOnInit(): void {
     this.getCartProducts()     
     this.cartProducts = this.cartService.getCartProducts()
   }

  //  isSend:boolean = false
  //  addCartProduct(cartImg:string, cartName:string, cartPrice:number){
  //   console.log(this.cartProducts);
    
  //   this.cartProducts.push({image:cartImg,title:cartName, price:cartPrice})
  //  }

   getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);      
   }   
  //  console.log(this.cartProducts) 
    this.getCartTotal()
  }
  count = 0;
  addAmount(index: number){
    this.count++
    if(this.count > 100) this.count = 100
    this.cartProducts[index].quantity++;
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts) )
  }
  
  value:number   = 1
  minsAmount(index: number){
    this.count--
    if(this.count < 1) this.count = 1
    this.cartProducts[index].quantity--;
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts) )
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
    // this.isSend = true
    window.location.reload();
    this.cartProducts = []
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  getCartTotal() {
    this.total = 0
    for(let x in this.cartProducts){
      this.total += this.cartProducts[x].price * this.cartProducts[x].quantity;
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { CartsService } from 'src/app/carts/services/carts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{ 
  cartProducts: any[] = [];
  cartProductsLength: number = 0; 
  
 

  constructor(
    private router: Router,     
    private cartsService: CartsService,  
  ) {}


  goToCart() {
    this.router.navigate(['/carts']);    
  }
 

// ************
  total:any = 0;

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);      
   }     
  }
 


}

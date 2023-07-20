import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { getLocaleMonthNames } from '@angular/common';
import { CartsService } from 'src/app/carts/services/carts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  itemCount: number = 0;

  constructor(private router: Router, private sharedService: SharedService, private cartService:CartsService) { }

  ngOnInit() {
    this.itemCount = this.sharedService.getItemCount();
    this.sharedService.itemCountUpdated.subscribe((count: number) => {
      this.itemCount = count;
    });
    console.log(this.cartCount);
    
    console.log(this.cartService.getLength());
    console.log(this.cartCount);
  }

  
  cartCount:number = JSON.parse(localStorage.getItem("cartcount")!)
  
  // this.cartService.getCartProducts().length
  // 
  goToCart() {
    this.router.navigate(['/carts']);
  }

}

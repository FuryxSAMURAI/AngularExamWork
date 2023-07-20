import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { CartsService } from 'src/app/carts/services/carts.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{ 
  cartProducts: any[] = [];
  cartProductsLength: number = 0; 
  
  @ViewChild('iconButton') iconButton!: ElementRef;

  constructor(
    private router: Router,     
    private cartsService: CartsService, 
    private themeService: ThemeService 
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
 


  // toggleTheme(): void {
  //   console.log('Toggle theme clicked'); // Проверьте, выводится ли это сообщение в консоль
  //   this.themeService.toggleTheme();
  // } 

  isDarkThemeEnabled(): boolean {
    return this.themeService.isDarkThemeEnabled();
  }



  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.clearIcons();
    this.setThemeIcon();
  }

  private clearIcons(): void {
    this.iconButton.nativeElement.innerHTML = '';
  }

  private setThemeIcon(): void {
    const iconClass = this.themeService.isDarkThemeEnabled() ? 'fas fa-sun' : 'fas fa-moon';
    const iconElement = document.createElement('i');
    iconElement.className = iconClass;
    this.iconButton.nativeElement.appendChild(iconElement);
  }

}

import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/carts/services/carts.service';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  
})
export class AllProductsComponent implements OnInit{
    products: any[] = [];
    categories: any[] = [];
    cartProducts: any[] = [];      

    constructor(
      private productService: ProductsService,
      private cartsService: CartsService,      
      private router: Router
      ) { }  


    ngOnInit(): void {      
      // if (localStorage.getItem('phonesFromAdmin') === null) {
      //   this.productService.getProducts()
      // }else{
      //   return this.products
      // }
      this.products = this.productService.getProducts(); 
      this.restoreFilterText();
      this.filterItems();  
    }

    goToProductDetails(productId: number) {      
      this.router.navigate(['/details', productId]);      
    }  


    

//_________ фИЛЬТР ____________-
filteredItems: any []= [];
selectedFilter: string = 'all';
filterText: string = '';


filterItems() {
  this.filteredItems = this.products.filter(item => {
    if (this.selectedFilter === 'all') {      
      return item.title.toString().includes(this.filterText);      
    } else if (this.selectedFilter === 'categoria') {
      return item.categoria.toString().includes(this.filterText);      
    } else if (this.selectedFilter === 'title') {
      return item.title.toString().includes(this.filterText);
    } else if (this.selectedFilter === 'price') {
      return item.price.toString().includes(this.filterText);
    }
    return false;
  });
}


//обновленный код для восстановления значения поля ввода и отображения полного списка товаров при обновлении страницы:
restoreFilterText() {
  const savedFilterText = localStorage.getItem('filterText');
  if (savedFilterText) {
    this.filterText = savedFilterText;
  }
}


//Теперь, при обновлении страницы, значение поля фильтра будет восстанавливаться из localStorage, но после этого будет вызываться метод filterItems(), который отфильтрует список товаров с использованием восстановленного значения фильтра. Таким образом, при обновлении страницы будет отображаться весь список товаров.
onFilterChanged() {
  this.filterText = ''; // Очищаем поле ввода
  this.filterItems(); // Вызываем фильтрацию
}


// ********************************************************************
//добавлении товара в корзину 

// get cartItemCount(): number {
//   return this.cartProducts.length;
// }


addToCart(event:any){  
  // console.log(event);
  // JSON.stringify()  //send Data
  // JSON.parse()      //Recive Data
  
  // if("cart" in localStorage){
    
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find((item) => item.id == event.id);
    if (exist) {
      exist.quantity++; // Увеличиваем количество товара
      // console.log("Product quantity increased in your cart");
    } else {
      // event.quantity = 1; // Устанавливаем начальное количество товара
      this.cartProducts.push(event);
      // console.log("Product added to your cart");
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
    
  } else {
    // event.quantity = 1; // Устанавливаем начальное количество товара
    this.cartProducts.push(event);
    
    // console.log("Product added to your cart");
  }
  localStorage.setItem("cart", JSON.stringify(this.cartProducts));
// }
}

// getCartItemCount(): number {
//   return this.cartsService.getCartItemCount();
// }


}

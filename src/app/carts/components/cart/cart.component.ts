import { Component, Input, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { CurrencyService } from 'src/app/currency.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
 cartProducts: any[] = [];
 total:any = 0;    

 selectedCurrency: string = '₴'; // Установим гривну по умолчанию
 currencies: string[] = ['₴', '$', '€']; // Список доступных валют

 isLoading: boolean = true;

  constructor(
    private cartsService: CartsService,
    public currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
     this.getCartProducts() 
     

    //  ***валюта***
    // this.cartProducts = this.cartsService.getCartProducts();
    this.currencyService.selectedCurrency$.subscribe(selectedCurrency => {
      this.selectedCurrency = selectedCurrency;
      this.updateConvertedPrices();
    });

    // **********loader************
 // Предположим, у вас есть асинхронная загрузка данных, которую нужно подождать перед отображением карточек товаров.
 this.loadProducts();

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


  // **********валюта****************
  updateConvertedPrices(): void {
    // Обновляем цены продуктов в выбранной валюте
    this.cartProducts.forEach(product => {
      product.convertedPrice = this.convertPrice(product.price);
    });
  }

  convertPrice(price: number): number {
    // Здесь вам нужно будет использовать актуальные курсы обмена для конвертации
    // Но так как курсы обмена у вас не предоставлены, в данном примере просто умножим цены на коэффициенты для наглядности
    switch (this.selectedCurrency) {
      case '$':
        return price * 0.035; // Замените на актуальный курс для USD
      case '€':
        return price * 0.030; // Замените на актуальный курс для EUR
      default:
        return price;
    }
  }


  // ******loader***********

loadProducts() {
  setTimeout(() => {
    this.isLoading = false;
  }, 1000);
}

}

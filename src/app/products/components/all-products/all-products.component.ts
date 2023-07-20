import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/carts/services/carts.service';
import { SharedDataService } from 'src/app/admin/shared-data.service';
import { CurrencyService } from 'src/app/currency.service';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  
})

export class AllProductsComponent implements OnInit{
    products: any[] = [];
    categories: any[] = [];
    cartProducts: any[] = [];    

    availableProducts: any[] = []; //связана с админ страницей 
    addedProducts: any[] = [];
    adminProduct: any[] = [];

    // ****валюта    
    currencies: string[] = ['₴', '$', '€']; // Пример доступных валют
    selectedCurrency: string = '₴'; // Установите валюту по умолчанию, // Используйте ngModel для выбора валюты

   

  @Output() currencyChange: EventEmitter<string> = new EventEmitter<string>();
  updateInterval: number = 5 * 60 * 1000; // 5 минут, можно изменить значение по вашему желанию

  // Идентификатор для отслеживания интервала и остановки его при необходимости
  updateIntervalId: any;


  isLoading: boolean = true;

    constructor(
      
      private cartsService: CartsService,   
      private sharedDataService: SharedDataService,  
      public productService: ProductsService,  
      private currencyService: CurrencyService, 
      private router: Router
      ) { }  


    ngOnInit(): void {      
      this.products = this.productService.getProducts(); 
      this.restoreFilterText();
      this.filterItems(); 

     
      // *******админ **************       
 // Получение доступных товаров из сервиса
      this.availableProducts = this.productService.getAllProducts();

 // Получение добавленных товаров из localStorage
 const addedProducts = this.getDataFromLocalStorage('addedProducts');
 if (addedProducts) {
   this.adminProduct = addedProducts; // Используем adminProduct для хранения добавленных товаров
   this.availableProducts = [...this.availableProducts, ...this.adminProduct];
 } else {
   this.adminProduct = []; // Если нет сохраненных товаров, создаем пустой массив
 }

//  console.log('Available products:', this.availableProducts);

 // Подписываемся на событие изменения localStorage
 window.addEventListener('storage', (event) => {
   if (event.key === 'addedProducts') {
     const updatedProducts = this.getDataFromLocalStorage('addedProducts');
     if (updatedProducts) {
       this.adminProduct = updatedProducts;
       this.availableProducts = [...this.availableProducts, ...this.adminProduct];
     } else {
       this.adminProduct = [];
     }
     console.log('Available products:', this.availableProducts);
   }
 });


//  ************валюта*************

// При инициализации компонента, проверяем localStorage на наличие сохраненной валюты
const savedCurrency = localStorage.getItem('selectedCurrency');
this.selectedCurrency = savedCurrency || '₴'; // Если валюта не была сохранена, устанавливаем значение по умолчанию


// Запускаем интервал обновления цен
// this.updateIntervalId = setInterval(() => {
//   this.updatePrices(); // Вызываем метод обновления цен
// }, this.updateInterval);

// Подписка на изменение выбранной валюты
this.currencyService.selectedCurrency$.subscribe((currency: string) => {
  // Обновляем цены продуктов при изменении валюты
  this.updatePrices(currency);
});


// **********loader************
this.simulateAsyncOperation();

 // Предположим, у вас есть асинхронная загрузка данных, которую нужно подождать перед отображением карточек товаров.
 this.loadProducts();


}

ngOnDestroy() {
  // При разрушении компонента останавливаем интервал
  clearInterval(this.updateIntervalId);
}
    

goToProductDetails(productId: number) {   
      // this.detailService.clearAboutProduct();
      // localStorage.setItem('productDetail', JSON.stringify(this.productService.getProductById(productId)));
    
      // Передаем параметр selectedCurrency в URL при переходе на страницу продукта
  this.router.navigate(['/details', productId], { queryParams: { selectedCurrency: this.selectedCurrency } });
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





// админ
getDataFromLocalStorage(key: string): any {
  const value: string | null = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
     }




// *****валюта****************

// // Метод для конвертации цен в выбранную валюту
// convertPrice(price: number): number {
//   // Здесь вам нужно будет использовать актуальные курсы обмена для конвертации
//   // Но так как курсы обмена у вас не предоставлены, в данном примере просто умножим цены на коэффициенты для наглядности

//   switch (this.selectedCurrency) {
//     case '$':
//       return price * 0.035; // Замените на актуальный курс для USD
//     case '€':
//       return price * 0.030; // Замените на актуальный курс для EUR
//     default:
//       return price;
//   }
// }
// onCurrencyChange(currency: string) {
//   this.selectedCurrency = currency;
//   localStorage.setItem('selectedCurrency', currency); // Сохраняем выбранную валюту в localStorage
// }
onCurrencyChange(currency: string): void {
  this.currencyService.setSelectedCurrency(currency);
  localStorage.setItem('selectedCurrency', currency); // Сохраняем выбранную валюту в localStorage
}

// Метод для обновления цен



// Метод для конвертации цен в выбранную валюту
convertPrice(price: number, selectedCurrency: string): number {
  // Здесь вы должны использовать актуальные курсы обмена для конвертации цен
  // Но так как курсы обмена у нас не предоставлены, давайте просто умножим цены на коэффициенты для наглядности

  switch (selectedCurrency) {
    case '$':
      return price * 0.035; // Замените на актуальный курс для USD
    case '€':
      return price * 0.030; // Замените на актуальный курс для EUR
    default:
      return price;
  }
}

// updatePrices() {
//   // Здесь можно обновить цены продуктов, если они меняются в реальном времени
//   // Например, получить актуальные курсы обмена и пересчитать цены

//   // В данном примере, для наглядности, просто обновим все продукты с актуальными валютами
//   this.availableProducts.forEach(product => {
//     product.convertedPrice = this.convertPrice(product.price); // Добавьте новое свойство convertedPrice для хранения конвертированной цены
//   });
// }

// Метод для обновления цен продуктов при изменении валюты
updatePrices(selectedCurrency: string): void {
  this.products.forEach(product => {
    product.convertedPrice = this.convertPrice(product.price, selectedCurrency);
  });
}


// ******loader***********


  simulateAsyncOperation() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  loadProducts() {
    // Ваш код для загрузки товаров, например, из сервиса.
    // После того, как данные загружены, установите isLoading в false, чтобы скрыть прелоадер.
    // Ниже приведен пример с задержкой в 2 секунды для демонстрации.
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

}

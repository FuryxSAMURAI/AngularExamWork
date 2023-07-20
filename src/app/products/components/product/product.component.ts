import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/carts/services/carts.service';
import { DetailsService } from '../../services/details.service';
import { ProductsService } from '../../services/products.service';
import { SharedDataService } from 'src/app/admin/shared-data.service';
import { CurrencyService } from 'src/app/currency.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit{
  products: any[] = [];
  @Input() data:any = {}
  @Output() item = new EventEmitter<any>();
  addedProducts: any[] = []; // Добавьте это свойство
  availableProducts: any[] = [];
  
  @Input() selectedCurrency: string = '₴'; // Добавьте входное свойство selectedCurrency
  

  clickCnt: number = 0;
  @Output() clickChange: EventEmitter<number> = new EventEmitter();
  adminProduct: any[] = [];

  // ***валюта
  // Интервал обновления в миллисекундах (например, каждые 5 минут)
  updateInterval: number = 5 * 60 * 1000; // 5 минут, можно изменить значение по вашему желанию

  // Идентификатор для отслеживания интервала и остановки его при необходимости
  updateIntervalId: any;

  isLoading: boolean = true;



  constructor(
    private router: Router,
    private cartsService: CartsService,    
    private detailService: DetailsService,
    public productService: ProductsService,
    private sharedDataService: SharedDataService,
    private currencyService: CurrencyService    
  ){}

  ngOnInit() {
    this.addedProducts = this.sharedDataService.getAddedProducts();    
    this.availableProducts = this.productService.getAllProducts();

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

//  *******валюта***
    // При инициализации компонента, проверяем localStorage на наличие сохраненной валюты
    const savedCurrency = localStorage.getItem('selectedCurrency');
    this.selectedCurrency = savedCurrency || '₴'; // Если валюта не была сохранена, устанавливаем значение по умолчанию
 
// Запускаем интервал обновления цен
this.updateIntervalId = setInterval(() => {
  this.updatePrices(); // Вызываем метод обновления цен
}, this.updateInterval);

// **********loader************
 // Предположим, у вас есть асинхронная загрузка данных, которую нужно подождать перед отображением карточек товаров.
 this.loadProducts();

}



ngOnDestroy() {
  // При разрушении компонента останавливаем интервал
  clearInterval(this.updateIntervalId);
}

updatePrices() {
  // Здесь можно обновить цены продуктов, если они меняются в реальном времени
  // Например, получить актуальные курсы обмена и пересчитать цены

  // В данном примере, для наглядности, просто обновим все продукты с актуальными валютами
  this.availableProducts.forEach(product => {
    product.convertedPrice = this.convertPrice(product.price); // Добавьте новое свойство convertedPrice для хранения конвертированной цены
  });
}

// Метод для мгновенного обновления цен при выборе валюты
updatePricesInstantly(selectedCurrency: string) {
  this.selectedCurrency = selectedCurrency;
  // Обновляем цены мгновенно в текущей выбранной валюте
  this.availableProducts.forEach(product => {
    product.convertedPrice = this.convertPrice(product.price);
  });
}





  add(){    
    window.location.reload(); //обновление страницы НЕОБХОДИМО ИЗМЕНИТЬ!!!!!!!!!  
    this.item.emit(this.data);
  }


  // переход на страницу продукта
  goToProductDetails(productId: number) {
    
    this.detailService.clearAboutProduct();
    localStorage.setItem('productDetail',
      JSON.stringify(this.productService.getProductById(productId))
    );
    this.router.navigate(['/details', productId]);
  } 


  
 // админ
getDataFromLocalStorage(key: string): any {
  const value: string | null = localStorage.getItem(key);
  return value ? JSON.parse(value) : [];
}




// **********валюта ***************
// Добавьте переменную для хранения текущей выбранной валюты
// selectedCurrency: string = '₴'; // Установите значение по умолчанию

// Добавьте список доступных валют (ISO-коды) для выбора
currencies: string[] = ['₴', '$', '€']; // Можно добавить другие валюты

// Метод для обработки изменения выбранной валюты
onCurrencyChange(currency: string) {
  this.selectedCurrency = currency;
  // Сохраняем выбранную валюту в localStorage
  localStorage.setItem('selectedCurrency', currency);
  // localStorage.setItem('selectedCurrency', currency); // Сохраняем выбранную валюту в localStorage
}


// Метод для конвертации цен в выбранную валюту
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
  // Ваш код для загрузки товаров, например, из сервиса.
  // После того, как данные загружены, установите isLoading в false, чтобы скрыть прелоадер.
  // Ниже приведен пример с задержкой в 2 секунды для демонстрации.
  setTimeout(() => {
    this.isLoading = false;
  }, 1000);
}
  





}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdedPhonesService } from './aded-phones.service';
import { NgModel } from '@angular/forms';
import { ProductsService } from '../products/services/products.service';
import { SharedDataService } from './shared-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  availableProducts:any[] = this.productService.getAllProducts()
  // availableProducts: any[] = [];
  adminProduct: any[] = [];
  @Output() productAdded: EventEmitter<any> = new EventEmitter();

  
  isLoading: boolean = true;

  constructor(
    private adedPhonesService: AdedPhonesService,    
    private sharedDataService: SharedDataService,
    private productService: ProductsService,
    ){}

    
    ngOnInit(): void {
  const savedAdminProduct = this.adminProduct; // Сохраняем текущий adminProduct


  const addedProducts = this.getDataFromLocalStorage('addedProducts');
  if (addedProducts) {
    this.adminProduct = addedProducts;
    this.availableProducts = this.productService.getAllProducts().concat(this.adminProduct);
  } else {
    this.availableProducts = this.productService.getAllProducts();
  }

  // **********loader************ 
 this.loadProducts();
}

  getAdminProducts(): void {
    this.adminProduct = this.adedPhonesService.getProducts();
    this.availableProducts = [...this.availableProducts, ...this.adminProduct];
  }


  // Local Storage TEST!
  key:string = '123456'
  value:any = '123456'
  
  

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
    this.availableProducts = this.availableProducts.filter(
      (product) => product.id !== id
    );

    this.adminProduct = this.adminProduct.filter(
      (product) => product.id !== id
    );
    
    localStorage.setItem('addedProducts', JSON.stringify(this.adminProduct)); // Обновление `localStorage` после удаления товара
    // this.productService.saveAdminProductToLocalStorage(); // Обновление `localStorage` после удаления товара
  
  }


  getDataFromLocalStorage(key: string): any {
    const value:any | undefined = localStorage.getItem(key);
    console.log(JSON.parse(value));
    return JSON.parse(value) || [];
  }


  imageLoadError: boolean = false;

  checkImage(): void {
    const img = new Image();
    img.src = this.phoneImg;
    img.onerror = () => {
      this.imageLoadError = true;
    };
    img.onload = () => {
      this.imageLoadError = false;
    };
  }

  phoneImg:any = '';
  phoneName:any = '';
  phoneInfo:any = '';
  phonePrice:number = 0;
  phones = this.adedPhonesService.getProducts().length

  id:any=2;
 
  
  // Добавления телефонов в сервис - aded-phones
  pushPhones(){  
  if (this.phoneImg && this.phoneName && this.phonePrice && this.phoneInfo) {            
   const newProduct = {     // Создание нового объекта продукта
    //  id: Date.now(), // Генерируем уникальный id
     image: this.phoneImg,
     title: this.phoneName,
     price: this.phonePrice,
     info: this.phoneInfo
   };
   
     
     this.adminProduct.push(newProduct);    // Добавление нового продукта в adminProduct
     this.availableProducts.push(newProduct); // Добавление нового продукта в availableProducts   
     this.sharedDataService.addProduct(newProduct); // Добавляем новый продукт через SharedDataService

     this.productService.updateProducts(this.availableProducts); // Обновление списка продуктов в ProductsService
      
    localStorage.setItem('addedProducts', JSON.stringify(this.adminProduct));   // Сохранение обновленного массива adminProduct в `localStorage`
       
    // this.productService.saveAdminProductToLocalStorage(); // Сохранение обновленного массива adminProduct в `localStorage`
  
     // Очистка полей
     this.phoneImg = '';
     this.phoneName = '';
     this.phonePrice = 0;
     this.phoneInfo = '';
   
  }
  }
  
 
  // Получение телефонов из сервиса - aded-phones
  getPhones(){
    console.log(this.adedPhonesService.getProducts());
  }
  
  // Очистка телефонов из сервиса - aded-phones
  removeAllPhones(){
    this.adedPhonesService.deleteArr()
  }


  showPrev:boolean = false;
  prev(){
    this.showPrev = !this.showPrev;
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











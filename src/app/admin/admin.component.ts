import { Component } from '@angular/core';
import { AdedPhonesService } from './aded-phones.service';
import { NgModel } from '@angular/forms';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(
    private adedPhonesService: AdedPhonesService,
    private productsService: ProductsService
    ){

      console.log(this.productsService.getAllProducts());
    }

  availableProducts:any[] = this.productsService.getAllProducts()
    
  ngOninit(){
  }
  // Local Storage TEST!
  key:string = '123456'
  value:any = '123456'
  saveDataToLocalStorage(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  deleteProduct(id:number){
    this.productsService.deleteProduct(id)
  }

  getDataFromLocalStorage(key: string): any {
    const value:any | undefined = window.localStorage.getItem(key);
    console.log(JSON.parse(value));
    return JSON.parse(value);
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
  phones = this.adedPhonesService.getPhones()

  // Валидация
  test(imgReq:NgModel, nameReq:NgModel, priceReq:NgModel, infoReq:NgModel){
    // console.log(imgReq);
    console.log(infoReq.valid);
    console.log(nameReq.valid);
    // console.log(priceReq);
  }

  id:any=2;
  testId(){
    console.log(this.productsService.getProductById(this.id));
    
  }

  // Добавления телефонов в сервис - aded-phones
  pushPhones(){
    // Local Storage
    // window.localStorage.setItem();
    this.productsService.addPhonesFromAdmin(this.phoneImg, this.phoneName, this.phonePrice)
    this.adedPhonesService.addPhones(this.phoneImg, this.phoneName, this.phonePrice, this.phoneInfo)
  }
  // Получение телефонов из сервиса - aded-phones
  getPhones(){
    console.log(this.adedPhonesService.getPhones());
  }
  
  // Очистка телефонов из сервиса - aded-phones
  removeAllPhones(){
    this.adedPhonesService.deleteArr()
  }


  showPrev:boolean = false;
  prev(){
    this.showPrev = !this.showPrev;
  }
}

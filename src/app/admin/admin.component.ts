import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ProductsService } from '../products/services/products.service';
import { AdedPhonesService } from './aded-phones.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(
    private adedPhonesService: AdedPhonesService,
    private productsService: ProductsService
  ) {
    console.log(this.productsService.getAllProducts());
  }

  availableProducts: any[] = this.productsService.getAllProducts();

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id);
    localStorage.setItem('phonesFromAdmin', JSON.stringify(this.productsService.getAllProducts()))
  }

  getDataFromLocalStorage(key: string): any {
    const value: any | undefined = window.localStorage.getItem(key);
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

  phoneImg: any = '';
  phoneCategori:any = ''
  phoneName: any = '';
  phoneInfo: any = '';
  phonePrice:number = 0;
  quantity:number = 0
  phones = this.adedPhonesService.getPhones();

  // Добавления телефонов в сервис - aded-phones
  pushPhones() {
    // Local Storage
    this.productsService.getAllProducts()
    if (localStorage.getItem('phonesFromAdmin') === null) {
      console.log(true);
    }else{
      console.log(false);
    }
    localStorage.setItem('phonesFromAdmin', JSON.stringify(this.productsService.getAllProducts()))
    // window.localStorage.setItem();
    this.productsService.addPhonesFromAdmin(this.phoneImg,this.phoneCategori,this.phoneName,this.phonePrice, this.phoneInfo,this.quantity);
    // this.adedPhonesService.addPhones(this.phoneImg,this.phoneName,this.phonePrice,this.phoneInfo);
  }
  // Получение телефонов из сервиса - aded-phones
  getPhones() {
    console.log(this.adedPhonesService.getPhones());
  }

  // Очистка телефонов из сервиса - aded-phones
  removeAllPhones() {
    this.adedPhonesService.deleteArr();
  }
}

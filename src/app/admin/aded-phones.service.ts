import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdedPhonesService {  
  availableProducts: any[] = [];
  adminProduct: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getAdminProducts()     
  }

 getAdminProducts(){
   if("addedProducts" in localStorage){
     this.adminProduct = JSON.parse(localStorage.getItem("addedProducts")!);      
  }   
 //  console.log(this.adminProduct) 
   
 }

  phones:any[] = []
  
  addProduct(
    phoneImg: any, 
    phoneName: any, 
    phonePrice: any, 
    phoneInfo: any){
    this.adminProduct.push({
      name: phoneName,
      img: phoneImg,  
      price: phonePrice,
      info: phoneInfo})
  }

  getProducts(){
    return this.adminProduct;
  }
  deleteArr(){
    this.adminProduct.splice(0, this.adminProduct.length)
  }
  
}

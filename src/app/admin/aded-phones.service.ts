import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdedPhonesService {

  constructor() { }

  phones:any[] = []
  
  addPhones(phoneImg:any, phoneName:any, phonePrice:any, phoneInfo:any){
    this.phones.push({name:phoneName,img:phoneImg, price:phonePrice,info:phoneInfo})
  }
  getPhones(){
    return this.phones;
  }
  deleteArr(){
    this.phones.splice(0, this.phones.length)
  }
}

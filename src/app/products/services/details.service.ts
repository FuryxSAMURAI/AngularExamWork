import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  item:any[]=[]
  constructor() { }

  getAboutProduct(){
    return this.item
  }

  pushAboutProduct(product:any){
    this.item.push(product)
  }

  clearAboutProduct(){
    this.item = []
  }


}

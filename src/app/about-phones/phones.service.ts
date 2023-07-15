import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  items:any[] = []
  constructor(
    ) {  
    }
    ngOnInit(){
    }
    pushPhones(image:string,name:string,price:number){
      this.items.push(image, name, price)
      
    }
    
    getItems(){
      console.log(this.items);
      return this.items
    }
}

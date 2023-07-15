import { Component } from '@angular/core';
import { PhonesService } from './phones.service';
@Component({
  selector: 'app-about-phones',
  templateUrl: './about-phones.component.html',
  styleUrls: ['./about-phones.component.css']
})
export class AboutPhonesComponent {
  constructor(
    private phonesService:PhonesService
  ){}

  itemsFromServ:string[] = []
  
  ngOnInit(){
    this.itemsFromServ = this.phonesService.getItems()
  }
  // getItems(){
    // console.log(this.itemsFromServ[0]);
  // }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/components/header/header.component';



@NgModule({
  declarations: [
    CartComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class CartsModule { }

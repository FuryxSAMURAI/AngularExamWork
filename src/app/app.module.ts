import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './shared/components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { ProductsService } from './products/services/products.service';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { AboutPhonesComponent } from './about-phones/about-phones.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    AboutPhonesComponent,
    AdminComponent,
    CartComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: [ProductsService, CartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

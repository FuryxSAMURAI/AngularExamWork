import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './shared/components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { ProductsService } from './products/services/products.service';
import { FormsModule } from '@angular/forms';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { ProductComponent } from './products/components/product/product.component';
import { CartsModule } from './carts/carts.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { CartsService } from './carts/services/carts.service';
import { CartComponent } from './carts/components/cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    ProductsDetailsComponent,
    ProductComponent,
    NotFoundComponent,
    AdminComponent
   
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ProductModule,
    CartsModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    ProductsService,
    CartsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

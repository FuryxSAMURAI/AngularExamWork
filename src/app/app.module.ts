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

import { CartsService } from './carts/services/carts.service';
import { AdminComponent } from './admin/admin.component';
import { AdedPhonesService } from './admin/aded-phones.service';
import { SharedDataService } from './admin/shared-data.service';
import { CurrencyService } from './currency.service';
import { ToggleThemeDirective } from './toggle-theme.directive';
import { ThemeService } from './theme.service';
import { LoaderComponent } from './loader/loader.component';







@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    ProductsDetailsComponent,
    ProductComponent,
    NotFoundComponent,
    AdminComponent,
    ToggleThemeDirective,
    LoaderComponent    
],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // ProductModule,
    CartsModule,
    SharedModule,
    
  ],
  providers: [
    ProductsService,
    CartsService,
    AdedPhonesService,
    SharedDataService,
    CurrencyService,
    ThemeService
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }

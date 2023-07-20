import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { AboutPhonesComponent } from './about-phones/about-phones.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'products' , component: AllProductsComponent},
  {path:'details/:id' , component: ProductsDetailsComponent},
  {path:'carts' , component: CartComponent},
  {path:'aboutPhones' , component: AboutPhonesComponent},
  {path:'admin' , component: AdminComponent},
  {path:'**' , component: NotFoundComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

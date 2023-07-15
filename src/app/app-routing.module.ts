import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
// import { AboutPhonesComponent } from './about-phones/about-phones.component';



const routes: Routes = [
  {path:'' , redirectTo:"products" , pathMatch: "full"},
  {path:'products' , component: AllProductsComponent},
  // {path:'details' , component: ProductsDetailsComponent},
  {path:'details/:id' , component: ProductsDetailsComponent},
  //ZA {path:'aboutPhones' , component: AboutPhonesComponent},
  {path:'carts' , component: CartComponent},
  {path:'admin' , component: AdminComponent},  
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' } // Перенаправление некорректных путей на страницу 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

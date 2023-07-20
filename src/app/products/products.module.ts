import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { CommentboxComponent } from './components/commentbox/commentbox.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ChildboxComponent } from './components/childbox/childbox.component';





@NgModule({
  declarations: [
    // AllProductsComponent,
    // ProductsDetailsComponent
    // ProductComponent
  
  
  
    CommentboxComponent,
    CommentsComponent,
    ChildboxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  // exports: [
  //   ProductComponent
  // ]
})
export class ProductsModule { }

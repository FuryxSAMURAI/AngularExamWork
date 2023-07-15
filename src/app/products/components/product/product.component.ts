import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/carts/services/carts.service';
import { DetailsService } from '../../services/details.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  products: any[] = [];
  @Input() data:any = {}
  @Output() item = new EventEmitter<any>();

  clickCnt:number = 0;
  @Output() clickChange: EventEmitter<number> = new EventEmitter();

  constructor(
    private router: Router,
    private cartsService: CartsService,    
    private detailService: DetailsService,
    private productService: ProductsService,
  ){}

  ngOnInit(): void {}



  add(){    
    window.location.reload(); //обновление страницы НЕОБХОДИМО ИЗМЕНИТЬ!!!!!!!!!  
    this.item.emit(this.data);
  }


  // переход на страницу продукта
  goToProductDetails(productId: number) {
    
    this.detailService.clearAboutProduct();
    localStorage.setItem(
      'productDetail',
      JSON.stringify(this.productService.getProductById(productId))
    );
    this.router.navigate(['/details', productId]);
  } 


}

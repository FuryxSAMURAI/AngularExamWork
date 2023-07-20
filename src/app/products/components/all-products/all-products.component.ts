import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PhonesService } from 'src/app/about-phones/phones.service';
import { Router } from '@angular/router';
import { ProductsDetailsComponent } from '../products-details/products-details.component';
import { DetailsService } from '../../services/details.service';
import { CartsService } from 'src/app/carts/services/carts.service';
import { CartComponent } from 'src/app/carts/components/cart/cart.component';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  // loading:boolean = false
  itemCount: number = 0;
  // constructor(private service:ProductsService){ }
  constructor(
    private phonesService: PhonesService,
    private productService: ProductsService,
    private cartService: CartsService,
    private cartComponent: CartComponent,
    private detailService: DetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // console.log(this.productService.getProducts());
    // this.getProducts()
    this.products = this.productService.getProducts();
    // this.categories = this.productService.getCategories();

    this.restoreFilterText();
    this.filterItems();

    //   // Подписка на изменения количества добавленных товаров
    this.productService.itemCountUpdated.subscribe((count: number) => {
      this.itemCount = count;
    });

    // // Получение текущего количества добавленных товаров
    this.itemCount = this.productService.getItemCount();

    // this.img = this.productService.image
    // this.name = this.products.title
    // this.price = this.products.price
  }

  // id:string&number;
  productCart: any;
  cartId: number = 0;
  cartName: string = '';
  cartPrice: number = 0;
  cartImg: string = '';
  c = 0;
  // q:number = 0
  pushProduct(productId: number) {
    // this.router.navigate(['/carts']);

    this.productCart = this.productService.getProductById(productId);
    console.log(this.productCart);
    this.cartId = this.productCart.id;
    this.cartName = this.productCart.title;
    this.cartPrice = this.productCart.price;
    this.cartImg = this.productCart.image;
    // this.cartService.addToCart(this.cartId,this.cartName,this.cartPrice,this.cartImg)
    this.cartService.addCartProduct(
      this.cartImg,
      this.cartName,
      this.cartPrice
    );

    // console.log(productId);
  }
  // title:string = 'df'
  addCartProduct(title: string, price: number) {}

  goToProductDetails(productId: number) {
    this.router.navigate(['/details', productId]);
    this.detailService.clearAboutProduct();
    localStorage.setItem(
      'productDetail',
      JSON.stringify(this.productService.getProductById(productId))
    );
    // this.detailService.pushAboutProduct(this.productService.getProductById(productId))
    // console.log(productId);
  }

  // ************************
  // items = [
  //   { name: 'Товар 1', price: 10 },
  //   { name: 'Товар 2', price: 20 },
  //   { name: 'Товар 3', price: 30 },
  //   { name: 'Товар 4', price: 40 }
  // ];

  filteredItems: any[] = [];
  selectedFilter: string = 'all';
  filterText: string = '';

  // filterItems() {
  //   this.filteredItems = this.products.filter(item => {
  //     if (this.selectedFilter === 'title') {
  //       return item.name.includes(this.filterText);
  //     } else if (this.selectedFilter === 'price') {
  //       return item.price.toString().includes(this.filterText);
  //     }
  //     return false;
  //   });
  // }

  filterItems() {
    this.filteredItems = this.products.filter((item) => {
      if (this.selectedFilter === 'all') {
        return item.title.toString().includes(this.filterText);
      } else if (this.selectedFilter === 'categoria') {
        return item.categoria.toString().includes(this.filterText);
      } else if (this.selectedFilter === 'title') {
        return item.title.toString().includes(this.filterText);
      } else if (this.selectedFilter === 'price') {
        return item.price.toString().includes(this.filterText);
      }
      return false;
    });
  }

  image: string = '';
  name: string = '';
  price: number = 0;
  addPhone() {
    this.productService.getAllProducts();
    console.log(this.productService.getAllProducts());
    this.phonesService.pushPhones(this.image, this.name, this.price);
  }

  //обновленный код для восстановления значения поля ввода и отображения полного списка товаров при обновлении страницы:
  restoreFilterText() {
    const savedFilterText = localStorage.getItem('filterText');
    if (savedFilterText) {
      this.filterText = savedFilterText;
    }
  }

  //Теперь, при обновлении страницы, значение поля фильтра будет восстанавливаться из localStorage, но после этого будет вызываться метод filterItems(), который отфильтрует список товаров с использованием восстановленного значения фильтра. Таким образом, при обновлении страницы будет отображаться весь список товаров.
  onFilterChanged() {
    this.filterText = ''; // Очищаем поле ввода
    this.filterItems(); // Вызываем фильтрацию
  }

  // **********
  @Input() data: any = {};
  @Output() item = new EventEmitter();

  add() {
    this.item.emit(this.data);
  }
}

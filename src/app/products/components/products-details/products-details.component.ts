import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartsService } from 'src/app/carts/services/carts.service';
import { DetailsService } from '../../services/details.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})

export class ProductsDetailsComponent implements OnInit{
  cartProducts: any[] = []; 
  products: any[] = [];

  id: any;
  product: any;
  comments: any[] = [];
  newComment: any = {
    name: '',
    text: ''
  };


  data: any | null = localStorage.getItem('productDetail');
  parsed = JSON.parse(this.data);

  item: any = this.detailsService.getAboutProduct();

  image: string = this.parsed?.image || '';
  title: string = this.parsed?.title || '';
  price: number = this.parsed?.price || 0;
  description: string = this.parsed.description;

  // currency: any = '₴';

  priceCount: number = this.price;
  count: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private productService: ProductsService,
    private cartsService: CartsService
  ) {
    //проверка id по клику
  //   this.id = this.route.snapshot.paramMap.get("id");
  //  console.log(this.id)
  }


  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.id = productId; //++
    this.product = this.productService.getProductById(this.id);
    this.retrieveComments();
  }


  back(){
    this.router.navigate(['/products']);
  }


  addToCart(event:any): void{ 
    window.location.reload(); //обновление страницы НЕОБХОДИМО ИЗМЕНИТЬ!!!!!!!!! 
    // this.buttonClick.emit();
    this.router.navigate(['/carts']);    
    this.cartsService.getCartProducts();

    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find((item) => item.id == this.id);
      if (exist) {
        exist.quantity++; // Увеличиваем количество товара          
      } else {
        const cartProduct = {
          id: this.id,
          image: this.image,
          title: this.title,
          price: this.price,
          quantity: 1
        }        
        this.cartProducts.push(cartProduct);         
      }  
    } else {
      const cartProduct = {
        id: this.id,
        image: this.image,
        title: this.title,
        price: this.price,
        quantity: 1
      };      
      this.cartProducts.push(cartProduct);        
    }
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  } 



  //комментарии
  addComment(): void {
    if (
      this.newComment.name.trim() !== '' &&
      this.newComment.text.trim() !== ''
    ) {
      let modifiedComment = {
        name: this.newComment.name,
        text: this.newComment.text.replace(/[@]/g, '*')
      };
      this.comments.push(modifiedComment);
      this.saveComments();
      this.newComment = {
        name: '',
        text: ''
      };
    }
  }

  saveComments(): void {
    localStorage.setItem(`comments_${this.id}`, JSON.stringify(this.comments));
  }

  retrieveComments(): void {
    const savedComments = localStorage.getItem(`comments_${this.id}`);
    if (savedComments) {
      this.comments = JSON.parse(savedComments);
    }
  }


}

 











  // // priceCount: number = this.price;
  // // count: number = 1;
  // increment(): void {
  //   this.count += 1;
  //   this.priceCount = this.price * this.count;
  // }
  // decrement(): void {
  //   this.count -= 1;
  //   this.priceCount = this.priceCount - this.price;
  //   if (this.count < 1) this.count = 1;
  //   if (this.priceCount < this.price) this.priceCount = this.price;
  // }

  // @Output() buttonClick = new EventEmitter();



//добавлении товара в корзину
// get cartItemCount(): number {
//   return this.cartProducts.length;
// }

// addToCart(event:any){  

//   this.buttonClick.emit();
//   this.router.navigate(['/carts'])
//   this.cartsService.addToCart(event);

//   if ("cart" in localStorage) {
//     this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
//     // let exist = this.cartProducts.find((item) => item.id == event.id);
//   } else {
//     this.cartProducts = []; // Создаем новый массив корзины, если он не существует
//   }

//     let existingProduct = this.cartProducts.find((item) => item.id === event.id);

//     if (existingProduct) {
//       // exist.quantity++;
//       existingProduct.quantity++; // Увеличиваем количество существующего товара
//     } else {
//       event.quantity = 1; // Установить начальное количество для нового товара     
//       this.cartProducts.push(event); // Добавить новый товар в корзину
//     }
//     localStorage.setItem("cart", JSON.stringify(this.cartProducts));
 
// }










   // comment: any = '';
  // processedComment: any= '';

  // processComment() {
  //   const sanitizedComment = this.comment.replace(/@/g, '*');
  //   const wordsToReplace = ['кокос', 'банан', 'плохой'];
  //   const regex = new RegExp(wordsToReplace.join('|'), 'gi');
  //   this.processedComment = sanitizedComment.replace(regex, '***');
  // }



import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartsService } from 'src/app/carts/services/carts.service';
import { DetailsService } from '../../services/details.service';
import { ProductsService } from '../../services/products.service';
import { CurrencyService } from 'src/app/currency.service';


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
  availableProducts: any[] = [];
 
  
  

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

  selectedCurrency: string = '₴'; // Установим гривну по умолчанию
  currencies: string[] = ['₴', '$', '€']; // Список доступных валют


// ************comments*************************
newName: string = '';
newComment: string = '';
recommendation: boolean = false;

comments: { 
  productId: string, 
  text: string,
  name: string,
  recommendation: boolean 
}[] = [];


isLoading: boolean = true;


constructor(  
  private detailsService: DetailsService,
  public productService: ProductsService,
  private cartsService: CartsService,   
  public currencyService: CurrencyService,
  private route: ActivatedRoute, 
  private router: Router,
) {
    //проверка id по клику
  //   this.id = this.route.snapshot.paramMap.get("id");
  //  console.log(this.id)
  }


  ngOnInit(): void {   
    const productId = this.route.snapshot.paramMap.get('id');
    this.id = productId;
    this.product = this.productService.getProductById(this.id);
    
    

    // Загрузка комментариев из localStorage при загрузке компонента 
    const currentProductId: string = this.getCurrentProductId(); // Получаем текущий ID продукта    
    const storedComments: string | null = localStorage.getItem(`comments_${currentProductId}`);
  if (storedComments) {
    this.comments = JSON.parse(storedComments);
  } else {
    this.comments = []; // Если комментарии для продукта не найдены, инициализируем пустым массивом
  }


  // ****валюта 
  this.route.queryParams.subscribe(params => {
    this.selectedCurrency = params['selectedCurrency'] || '₴';
    this.updateConvertedPrices();
  });


  // **********loader************
 // Предположим, у вас есть асинхронная загрузка данных, которую нужно подождать перед отображением карточек товаров.
 this.loadProducts();

  
  }


  back(){
    this.router.navigate(['/products']);
  }


  addToCart(event: any): void{     
    this.router.navigate(['/carts']);    
    // this.cartsService.getCartProducts();

    // Проверяем, есть ли товар уже в корзине
  let cartProducts: any[] = [];
  if ("cart" in localStorage) {
    cartProducts = JSON.parse(localStorage.getItem("cart")!);
  }

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

  
  



  //**************комментарии********************
  addComment() {
    const currentProductId: string = this.getCurrentProductId(); // Получаем текущий ID продукта

    if (!this.newName.trim()) {
      return; // Проверка на пустое имя
    }
    if (!this.newComment.trim()) {
      return; // Проверка на пустой комментарий
    }  

    // Заменяем слова и символы в комментарии
    const replacedComment: string = this.newComment
      .replace(/кокос/g, '*')
      .replace(/банан/g, '*')
      .replace(/плохой/g, '*')
      .replace(/@/g, '*')
      .replace(/#/g, '*')      
      .replace(/%/g, '*')      
      .replace(/&/g, '*')
      .replace(/№/g, '*'); 
   
    const newComment = { 
        productId: currentProductId, 
        text: replacedComment, 
        name: this.newName,
        recommendation: this.recommendation 
    }; // Здесь присваиваем значение по умолчанию, например, true

      this.comments.push(newComment);       
    // Сохраняем комментарии в localStorage
    localStorage.setItem(`comments_${currentProductId}`, JSON.stringify(this.comments));

    // Очищаем поле ввода
    // this.recommendation = false; // Сброс выбранной рекомендации после добавления комментария
    this.newName = '';
    this.newComment = ''; 
    this.recommendation = false;
  } 

  // deleteComment(index: number): void {
  //   this.comments.splice(index, 1);    
  // }

  getRecommendationColor(recommendation: boolean): string {
    return recommendation ? 'green' : 'red'; // Зеленый цвет для рекомендации, красный цвет для нерекомендации
  }
 
  getCurrentProductId(): string {
    const url = window.location.href;    
    const productId = url.substring(url.lastIndexOf('/') + 1);    
    return productId;
  }
 


 
  


  // ******валюта********************
  updateConvertedPrices(): void {
    // Обновляем цену продукта в выбранной валюте
    this.priceCount = this.convertPrice(this.price);
  }

  convertPrice(price: number): number {
    // Здесь вам нужно будет использовать актуальные курсы обмена для конвертации
    // Но так как курсы обмена у вас не предоставлены, в данном примере просто умножим цены на коэффициенты для наглядности
    switch (this.selectedCurrency) {
      case '$':
        return price * 0.035; // Замените на актуальный курс для USD
      case '€':
        return price * 0.030; // Замените на актуальный курс для EUR
      default:
        return price;
    }
  }


  // ******loader***********

loadProducts() {
  // Ваш код для загрузки товаров, например, из сервиса.
  // После того, как данные загружены, установите isLoading в false, чтобы скрыть прелоадер.
  // Ниже приведен пример с задержкой в 2 секунды для демонстрации.
  setTimeout(() => {
    this.isLoading = false;
  }, 1000);
}



}

 









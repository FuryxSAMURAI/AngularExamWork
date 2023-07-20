import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartsService } from 'src/app/carts/services/carts.service';
import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private cartService: CartsService,
    private router: Router
  ) {}
  data: any | null = localStorage.getItem('productDetail');
  parsed = JSON.parse(this.data);

  item: any = this.detailsService.getAboutProduct();

  image: string = this.parsed.image;
  title: string = this.parsed.title;
  price: number = this.parsed.price;
  description: string = this.parsed.description;

  currency: any = '₴  ';

  back(){this.router.navigate(['/products']);}
  onSelectChange() {
    console.log(this.currency); // Вывод выбранного значения в консоль
  }

  priceCount: number = this.price;
  count: number = 1;
  increment() {
    this.count += 1;
    this.priceCount = this.price * this.count;
  }
  decrement() {
    this.count -= 1;
    this.priceCount = this.priceCount - this.price;
    if (this.count < 1) this.count = 1;
    if (this.priceCount < this.price) this.priceCount = this.price;
  }

  @Output() buttonClick = new EventEmitter();

  public add(): void {
    this.buttonClick.emit();
    this.router.navigate(['/carts'])
  }

  comment: any = '';
  processedComment: any= '';

  processComment() {
    const sanitizedComment = this.comment.replace(/@/g, '*');
    const wordsToReplace = ['кокос', 'банан', 'плохой'];
    const regex = new RegExp(wordsToReplace.join('|'), 'gi');
    this.processedComment = sanitizedComment.replace(regex, '***');
  }
}

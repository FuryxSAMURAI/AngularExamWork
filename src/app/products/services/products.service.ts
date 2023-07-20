import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: any[] = [  
    {
        id: 1,
        categoria: 'cellphone',
        image: 'assets/POCO_F5.jpg',
        title: 'POCO F5 Pro 8/256 Black',
        price: 22999,
        description: 'Poco F5 обладает элегантным дизайном с изогнутыми краями экрана, которые добавляют красоты и уникальности устройству. Этот смартфон предлагает потрясающее визуальное впечатление благодаря своему стильному и современному внешнему виду.'
      },
      {
        id: 2,
        categoria: 'tv',
        image: 'assets/Samsung_UE43CU7100UXUA.jpg',
        title: 'Телевізор Samsung UE43CU7100UXUA',
        price: 17499,
        description: 'Телевизор Samsung UE43CU7100UXUA обладает стильным дизайном и привлекательным внешним видом. Устройство имеет компактный размер с экраном, диагональю 43 дюйма, который обеспечивает яркое и четкое изображение с высокой детализацией. Он предлагает потрясающий визуальный опыт и широкие углы обзора, позволяющие наслаждаться любимыми фильмами и программами с комфортом.'
      },
      {
        id: 3,
        categoria: 'laptop',
        image: 'assets/Lenovo_IdeaPad_Gaming3_15ACH6).jpg',
        title: 'Ноутбук Lenovo IdeaPad Gaming 3 15ACH6',
        price: 33999,
        description: 'Ноутбук Lenovo IdeaPad Gaming 3 15ACH6 — стильное и мощное игровое устройство с 15.6-дюймовым экраном. Он обеспечивает яркие цвета и высокую четкость изображения. Благодаря мощному процессору и графической карте, этот ноутбук идеально подходит для игр и многозадачных задач.'
      },
      {
        id: 4,
        categoria: 'laptop',
        image: 'assets/Ігровий_монітор вигнутий_VA27.jpg',
        title: 'Ігровий монітор вигнутий VA 27" Samsung LC27G55TQBIXCI',
        price: 9999,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 5,
        categoria: 'MacBook',
        image: 'assets/Apple_MacBook_Air_M2_Chip13_8256GB.jpg',
        title: 'Apple MacBook Air M2 Chip 13" 8/256GB',
        price: 57499,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 6,
        categoria: 'cellphone',
        image: 'assets/realme_GT_Neo_350W 12256GB.jpg',
        title: 'realme GT Neo 3 150W 12/256GB',
        price: 16999,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 7,
        categoria: 'laptop',
        image: 'assets/Ноутбук_ASUS_ROG_Strix_Scar_18.png',
        title: 'Ноутбук ASUS ROG Strix Scar 18',
        price: 183027,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 8,
        categoria: 'cellphone',
        image: 'assets/Samsung_Galaxy_S21_FE_G990B_8256GB.jpg',
        title: 'Samsung Galaxy S21 FE G990B 8/256GB',
        price: 23399,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 9,
        categoria: 'laptop',
        image: 'assets/lenovoLegion.jpg',
        title: 'Ноутбук Lenovo Legion 5 15ITH6',
        price: 37380,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 10,
        categoria: 'cellphone',
        image: 'assets/Iphone14Pro-Max.jpg',
        title: 'Apple iPhone 14 Pro Max 128Gb',
        price: 54999,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 11,
        categoria: 'cellphone',
        image: 'assets/Xiaomi_Redmi_Note12_4128GB.jpg',
        title: 'Xiaomi Redmi Note 12 4/128GB',
        price: 7999,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 12,
        categoria: 'iPad',
        image: 'assets/Apple_iPad9i.jpg',
        title: 'Xiaomi Redmi Note 12 4/128GB',
        price: 13999,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
      id: 13,
      categoria: 'iphone',
      image: 'assets/apple12.jpg',
      title: 'iPhone 11 Pro Max',
      price: 21200,
      description: 'iPhone 11 Pro: the most powerful and advanced smartphone'
    },
    {
      id: 14,
      categoria: 'iphone',
      image: 'assets/iphone12pro.jpg',
      title: 'iPhone 12 Pro Max',
      price: 23300,
      description: 'Big is beautiful, they say. So, is the new iPhone 12 Pro Max, the biggest phone Apple has ever built, a giant beauty or an over-sized monster?'
    },
    {
      id: 15,
      categoria: 'iphone',
      image: 'assets/iphone13pro.jpg',
      title: 'iPhone 13 Pro',
      price: 31499,
      description: 'Iphone can be endowed with the fastest processor in the world, but if it’s saddled with a slow screen, it could still feel sluggish — especially when compared to a similarly equipped device with a faster panel'
    },
    {
      id: 16,
      categoria: 'iphone',
      image: 'assets/Iphone14Pro-Max.jpg',
      title: 'iPhone 14 Pro-Max',
      price: 55999,
      description: 'The iPhone 14 Pro Max display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle.'
    },
    {
      id: 17,
      categoria: 'iphone',
      image: 'assets/iPhone-15.jpg',
      title: 'iPhone 15 ',
      price: 42200,
      description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
    },
  ]
  

  private categories: any[] = [
    {
      id: 1,
      categoria: 'iphone'
    },
    {
      id: 2,
      categoria: 'laptop'
    },
    {
      id: 3,
      categoria: 'tele'
    }
  ]

  // constructor(private http:HttpClient) { }
  getProducts() {
    return this.products;    
  }

  getAllProducts() {
    // return this.http.get('https://fakestoreapi.com/products')
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }




// ____Filter By Category____
getCategories() {
  return this.categories; 
}
getAllCategories() {
   return this.categories; 
}
getCategoriesById(id: number) {
  return this.categories.find(option => option.id === id); 
}

getProductsByCategory(keyword: string) {
  return this.categories.find(option => option.keyword === keyword); 
}

// ***************
private itemCount: number = 0;
  itemCountUpdated: EventEmitter<number> = new EventEmitter<number>();

  getItemCount() {
    return this.itemCount;
  }

  updateItemCount(count: number) {
    this.itemCount = count;
    this.itemCountUpdated.emit(this.itemCount);
  }

  // id:number = 0
  prodLength:number = 0
  prodId:number = 0;
  addPhonesFromAdmin(phoneImg:any,phoneName:any,phonePrice:any){
    // console.log(this.products);
    this.prodLength = this.products.length
    // console.log(this.products[this.prodLength-1].id);
    this.prodId = this.products[this.prodLength-1].id
    this.products.push({id:this.prodId+1,image:phoneImg,title:phoneName,price:phonePrice})
  }

  deleteProduct(id:number){
    this.products.splice(id,1)
  }

}

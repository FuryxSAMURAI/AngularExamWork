import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productAdded: EventEmitter<any> = new EventEmitter();


  private products: any[] = [  
    // {quantity: '1'},
    {
        id: 1,
        categoria: 'cellphone',
        image: 'assets/POCO_F5.jpg',
        title: 'POCO F5 Pro 8/256 Black',
        price: 22999,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 2,
        categoria: 'tv',
        image: 'assets/Samsung_UE43CU7100UXUA.jpg',
        title: 'Телевізор Samsung UE43CU7100UXUA',
        price: 17499,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 3,
        categoria: 'laptop',
        image: 'assets/Lenovo_IdeaPad_Gaming3_15ACH6).jpg',
        title: 'Ноутбук Lenovo IdeaPad Gaming 3 15ACH6 (82K200XMRA)',
        price: 33999,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 4,
        categoria: 'laptop',
        image: 'assets/Ігровий_монітор вигнутий_VA27.jpg',
        title: 'Ігровий монітор вигнутий VA 27" Samsung LC27G55TQBIXCI',
        price: 9999,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 5,
        categoria: 'MacBook',
        image: 'assets/Apple_MacBook_Air_M2_Chip13_8256GB.jpg',
        title: 'Apple MacBook Air M2 Chip 13" 8/256GB',
        price: 57499,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 6,
        categoria: 'cellphone',
        image: 'assets/realme_GT_Neo_350W 12256GB.jpg',
        title: 'realme GT Neo 3 150W 12/256GB',
        price: 16999,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 7,
        categoria: 'laptop',
        image: 'assets/Ноутбук_ASUS_ROG_Strix_Scar_18.png',
        title: 'Ноутбук ASUS ROG Strix Scar 18',
        price: 183027,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 8,
        categoria: 'cellphone',
        image: 'assets/Samsung_Galaxy_S21_FE_G990B_8256GB.jpg',
        title: 'Samsung Galaxy S21 FE G990B 8/256GB',
        price: 23399,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 9,
        categoria: 'laptop',
        image: 'assets/lenovoLegion.jpg',
        title: 'Ноутбук Lenovo Legion 5 15ITH6',
        price: 37380,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 10,
        categoria: 'cellphone',
        image: 'assets/Iphone14Pro-Max.jpg',
        title: 'Apple iPhone 14 Pro Max 128Gb',
        price: 54999,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 11,
        categoria: 'cellphone',
        image: 'assets/Xiaomi_Redmi_Note12_4128GB.jpg',
        title: 'Xiaomi Redmi Note 12 4/128GB',
        price: 7999,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
        id: 12,
        categoria: 'iPad',
        image: 'assets/Apple_iPad9i.jpg',
        title: 'Xiaomi Redmi Note 12 4/128GB',
        price: 13999,
        quantity: 1,
        description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
      },
      {
      id: 13,
      categoria: 'iphone',
      image: 'assets/apple12.jpg',
      title: 'iPhone 11 Pro Max',
      price: 21200,
      quantity: 1,
      description: 'iPhone 11 Pro: the most powerful and advanced smartphone'
    },
    {
      id: 14,
      categoria: 'iphone',
      image: 'assets/iphone12pro.jpg',
      title: 'iPhone 12 Pro Max',
      price: 23300,
      quantity: 1,
      description: 'Big is beautiful, they say. So, is the new iPhone 12 Pro Max, the biggest phone Apple has ever built, a giant beauty or an over-sized monster?'
    },
    {
      id: 15,
      categoria: 'iphone',
      image: 'assets/iphone13pro.jpg',
      title: 'iPhone 13 Pro',
      price: 31499,
      quantity: 1,
      description: 'Iphone can be endowed with the fastest processor in the world, but if it’s saddled with a slow screen, it could still feel sluggish — especially when compared to a similarly equipped device with a faster panel'
    },
    {
      id: 16,
      categoria: 'iphone',
      image: 'assets/Iphone14Pro-Max.jpg',
      title: 'iPhone 14 Pro-Max',
      price: 55999,
      quantity: 1,
      description: 'The iPhone 14 Pro Max display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle.'
    },
    {
      id: 17,
      categoria: 'iphone',
      image: 'assets/iPhone-15.jpg',
      title: 'iPhone 15 ',
      price: 42200,
      quantity: 1,
      description: 'Renders of the 6.7-inch iPhone 15 Plus suggest that it will feature some minor design updates compared to the iPhone 14 Plus, including the Dynamic Island, slimmer bezels, and slight tweaks to the size and thickness of the device. '
    },
  ]  

  private categories: any[] = [
    {id: 1,categoria: 'iphone'},
    {id: 2,categoria: 'laptop'},
    {id: 3,categoria: 'tele'}
  ] 

  adminProduct: any[] = [];  


  getProducts() {
    return this.products;       
  }

  getAllProducts() {
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


  // *************ZA-start***********
  
  id:number = 0
  prodLength:number = 0
  prodId:number = 0;
 

 

// // Метод для восстановления adminProduct из localStorage
// getAdminProductFromLocalStorage(): any[] {
//   const addedProducts = localStorage.getItem('addedProducts');
//   return addedProducts ? JSON.parse(addedProducts) : [];
// }

// private getDataFromLocalStorage(key: string): any {
//   const value = localStorage.getItem(key);
//   return value ? JSON.parse(value) : null;
// }



  addPhonesFromAdmin(phoneImg: any, phoneName: any, phonePrice: any): void{
    
    const newProduct = {
      id: Date.now(), // Генерируем уникальный id
      image: phoneImg,
      title: phoneName,
      price: phonePrice
    };
  
    this.adminProduct.push(newProduct);
    localStorage.setItem('addedProducts', JSON.stringify(this.adminProduct));
    // this.saveAdminProductToLocalStorage();
  }

  // public saveAdminProductToLocalStorage(): void {
  //   localStorage.setItem('addedProducts', JSON.stringify(this.adminProduct));
  // }
  deleteProduct(id:number){
    this.products.splice(id,1)
    localStorage.setItem('addedProducts', JSON.stringify(this.adminProduct));
   
  }

  // deleteProduct(id: number) {
  //   this.products = this.products.filter(product => product.id !== id);
  //   this.adminProduct = this.adminProduct.filter(product => product.id !== id);
    // this.saveAdminProductToLocalStorage();
  // }

  updateProducts(products: any[]) {
    this.products = products;
  }





  }

 
  


  

 



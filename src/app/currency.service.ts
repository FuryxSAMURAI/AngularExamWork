import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  // selectedCurrency: string = 'USD'; // По умолчанию выбрана валюта USD
  availableProducts: any[] = []; //связана с админ страницей 

  selectedCurrency: string = '₴';
  private selectedCurrencySubject: BehaviorSubject<string> = new BehaviorSubject<string>('₴');
  public selectedCurrency$: Observable<string> = this.selectedCurrencySubject.asObservable();

  
  constructor(private http: HttpClient) { }

  // getCurrencies() {
  //   // Здесь вы можете использовать API для получения данных о курсах валют
  //   // Возможно, вам понадобится заменить 'YOUR_API_ENDPOINT' на адрес вашего API
  //   return this.http.get('YOUR_API_ENDPOINT');
  // }

  // convertPrice(price: number, currency: string) {
  //   // Здесь реализуйте конвертацию цены в соответствии с выбранной валютой
  //   // Для упрощения, предположим, что у вас есть только курс USD к выбранной валюте
  //   const exchangeRate = 1.2; // Пример: 1 USD = 1.2 выбранной валюты
  //   return price * exchangeRate;
  // }


  // +1
  setSelectedCurrency(currency: string): void {
    this.selectedCurrency = currency;
    localStorage.setItem('selectedCurrency', currency); // Сохраняем выбранную валюту в localStorage
  }

  getSelectedCurrency(): string {
    return this.selectedCurrency;
  }

  // Метод для конвертации цен в выбранную валюту
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
// onCurrencyChange(currency: string) {
//   this.selectedCurrency = currency;
//   localStorage.setItem('selectedCurrency', currency); // Сохраняем выбранную валюту в localStorage
// }
onCurrencyChange(currency: string): void {
  this.setSelectedCurrency(currency);
  localStorage.setItem('selectedCurrency', currency); // Сохраняем выбранную валюту в localStorage
}

// Метод для обновления цен
updatePrices() {
  // Здесь можно обновить цены продуктов, если они меняются в реальном времени
  // Например, получить актуальные курсы обмена и пересчитать цены

  // В данном примере, для наглядности, просто обновим все продукты с актуальными валютами
  this.availableProducts.forEach(product => {
    product.convertedPrice = this.convertPrice(product.price); // Добавьте новое свойство convertedPrice для хранения конвертированной цены
  });
}
}

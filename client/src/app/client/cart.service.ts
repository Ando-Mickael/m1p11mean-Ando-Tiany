import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private productCountSubject = new Subject<number>();

  productCount$ = this.productCountSubject.asObservable();

  getCount(): number {
    const productsString = localStorage.getItem('cart');

    if (productsString) {
      const products = JSON.parse(productsString);
      const count = Array.isArray(products) ? products.length : 0;
      this.productCountSubject.next(count); // Notify subscribers about the change
      return count;
    }

    return 0;
  }
}

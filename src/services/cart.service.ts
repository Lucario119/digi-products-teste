import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product): void {
    const currentCart = this.cartSubject.value;
    if (!currentCart.some(cartProduct => cartProduct.name === product.name)) {
      this.cartSubject.next([...currentCart, product]);
    }
  }

  removeFromCart(product: Product): void {
    const currentCart = this.cartSubject.value;
    this.cartSubject.next(currentCart.filter(cartProduct => cartProduct.name !== product.name));
  }

  getCart() {
    return this.cart$;
  }
}

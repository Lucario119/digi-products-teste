// src/app/services/cart.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { Product } from '../models/Product.interface';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  const mockProduct: Product = { name: 'Product 1', detail: 'Detail 1', price: '99', image: 'http://placehold.it/300x300/999/CCC' };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to cart', (done: DoneFn) => {
    service.addToCart(mockProduct);
    service.getCart().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0]).toEqual(mockProduct);
      done();
    });
  });

  it('should remove product from cart', (done: DoneFn) => {
    service.addToCart(mockProduct);
    service.removeFromCart(mockProduct);
    service.getCart().subscribe(products => {
      expect(products.length).toBe(0);
      done();
    });
  });

  it('should not add duplicate products to cart', (done: DoneFn) => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);
    service.getCart().subscribe(products => {
      expect(products.length).toBe(1);
      done();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/Product.interface';
import { CartService } from '../../services/cart.service';
import { ShopCartComponent } from './shop-cart.component';

describe('ShopCartComponent', () => {
  let component: ShopCartComponent;
  let fixture: ComponentFixture<ShopCartComponent>;
  let mockCartService: { getCart: { and: { returnValue: (arg0: Observable<Product[]>) => void; }; }; removeFromCart: any; };

  const mockCartProducts: Product[] = [
    { name: 'Product 1', detail: 'Detail 1', price: '99', image: 'http://placehold.it/300x300/999/CCC' },
    { name: 'Product 2', detail: 'Detail 2', price: '199', image: 'http://placehold.it/300x300/999/CCC' }
  ];

  beforeEach(() => {
    mockCartService = jasmine.createSpyObj(['getCart', 'removeFromCart']);
    mockCartService.getCart.and.returnValue(of(mockCartProducts));

    TestBed.configureTestingModule({
      declarations: [ShopCartComponent],
      providers: [
        { provide: CartService, useValue: mockCartService }
      ]
    });

    fixture = TestBed.createComponent(ShopCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart products on init', () => {
    expect(component.cartProducts.length).toBe(2);
  });

  it('should calculate total price correctly', () => {
    expect(component.getTotal()).toBe(298);
  });

  it('should remove product from cart', () => {
    const product = mockCartProducts[0];
    component.removeFromCart(product);
    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(product);
  });
});

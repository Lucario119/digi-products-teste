import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/Product.interface';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';
import { ProductsListComponent } from './products-list.component';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let mockProductService;
  let mockCartService: { getCart: { and: { returnValue: (arg0: Observable<never[]>) => void; }; }; addToCart: any; removeFromCart: any; };
  let mockSearchService;

  const mockProducts: Product[] = [
    { name: 'Product 1', detail: 'Detail 1', price: '99', image: 'http://placehold.it/300x300/999/CCC' },
    { name: 'Product 2', detail: 'Detail 2', price: '199', image: 'http://placehold.it/300x300/999/CCC' }
  ];

  beforeEach(() => {
    mockProductService = jasmine.createSpyObj(['getProducts']);
    mockCartService = jasmine.createSpyObj(['getCart', 'addToCart', 'removeFromCart']);
    mockSearchService = jasmine.createSpyObj(['searchText$']);

    mockProductService.getProducts.and.returnValue(of(mockProducts));
    mockCartService.getCart.and.returnValue(of([]));
    mockSearchService.searchText$ = of('');

    TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: CartService, useValue: mockCartService },
        { provide: SearchService, useValue: mockSearchService }
      ]
    });

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(component.products.length).toBe(2);
  });

  it('should filter products based on search text', () => {
    component.filterProducts('Product 1');
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Product 1');
  });

  it('should add product to cart', () => {
    const product = mockProducts[0];
    component.addToCart(product);
    expect(mockCartService.addToCart).toHaveBeenCalledWith(product);
  });

  it('should remove product from cart', () => {
    const product = mockProducts[0];
    component.removeFromCart(product);
    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(product);
  });
});

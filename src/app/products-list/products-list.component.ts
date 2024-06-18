import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/Product.interface';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  private searchSubscription: Subscription = new Subscription;
  private cartSubscription: Subscription = new Subscription;
  cartProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });

    this.searchSubscription = this.searchService.searchText$.subscribe(searchText => {
      this.filterProducts(searchText);
    });

    this.cartSubscription = this.cartService.getCart().subscribe(cartProducts => {
      this.cartProducts = cartProducts;
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  isInCart(product: Product): boolean {
    return this.cartProducts.some(cartProduct => cartProduct.name === product.name);
  }

  filterProducts(searchText: string): void {
    if (!searchText) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        Object.values(product).some(value =>
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/Product.interface';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit, OnDestroy {
  cartProducts: Product[] = [];
  filteredCartProducts: Product[] = [];
  private searchSubscription: Subscription = new Subscription();
  searchText: string = '';

  constructor(
    private cartService: CartService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(products => {
      this.cartProducts = products;
      this.filterCartProducts(this.searchText);
    });

    this.searchSubscription = this.searchService.searchText$.subscribe(searchText => {
      this.searchText = searchText;
      this.filterCartProducts(searchText);
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  getTotal(): number {
    return this.cartProducts.reduce((total, product) => total + parseFloat(product.price), 0);
  }

  filterCartProducts(searchText: string): void {
    if (!searchText) {
      this.filteredCartProducts = this.cartProducts;
    } else {
      this.filteredCartProducts = this.cartProducts.filter(product =>
        Object.values(product).some(value =>
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }
}

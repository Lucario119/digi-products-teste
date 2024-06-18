import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {
  cartProducts: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(products => {
      this.cartProducts = products;
    });
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  getTotal(): number {
    return this.cartProducts.reduce((total, product) => total + parseFloat(product.price), 0);
  }
}

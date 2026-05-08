import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../services/product-service';
import { Product } from '../product-card/product-card';


@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
 cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  removeItem(product: Product): void {
    this.productService.removeFromCart(product.id);
  }

  clearCart(): void {
    this.cartItems.forEach(item => {
      this.productService.removeFromCart(item.id);
    });
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}

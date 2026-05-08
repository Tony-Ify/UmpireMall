import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product-service';
import { Product } from '../product-card/product-card';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartItems: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(productId: number) {
    this.productService.removeFromCart(productId);
  }

  getTotal(): number {
    return this.productService.getCartTotal();
  }

  checkout() {
    alert(`Thank you for your purchase! Total: $${this.getTotal()}`);
    this.productService.clearCart();
  }
}

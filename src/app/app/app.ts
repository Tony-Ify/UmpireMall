import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product-service';
import { RouterModule, RouterOutlet,  RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ RouterLink, RouterModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
 title = 'product-cart';
  
  constructor(private productService: ProductService) {
    this.productService.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });
  }
  
  cartCount: number = 0;
}
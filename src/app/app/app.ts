import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product-service';
import { RouterModule, RouterOutlet,  RouterLink } from '@angular/router';
import { Product } from '../product-card/product-card';
@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
   cartCount: number = 0;

  constructor(private productService: ProductService) {
    this.productService.getCartItems().subscribe((items: Product[]) => {
      this.cartCount = items.length;
    });
  }
}
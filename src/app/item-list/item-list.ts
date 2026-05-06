import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../product-card/product-card';
import { ProductService } from '../services/product-service';
@Component({
  selector: 'app-item-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './item-list.html',
  styleUrls: ['./item-list.css'],
})
export class ItemList {
   products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  cartCount: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCartCount();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  loadCartCount() {
    this.productService.getCartItems().subscribe(() => {
      this.cartCount = this.productService.getCartCount();
    });
  }

  filterProducts() {
    if (!this.searchQuery.trim()) {
      this.filteredProducts = this.products;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
  }

  isInCart(productId: number): boolean {
    return this.productService.isInCart(productId);
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    // Trigger change detection for the specific product
    this.filteredProducts = [...this.filteredProducts];
  }

  removeFromCart(productId: number): void {
    this.productService.removeFromCart(productId);
    this.filteredProducts = [...this.filteredProducts];
  }
}

    
import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService} from '../services/product-service';
import { Product } from '../product-card/product-card';
@Component({
  selector: 'app-item-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.html',
  styleUrls: ['./item-list.css']
})
export class ItemList implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  loading: boolean = true;

  constructor(
    public productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

   getStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
  }

  getRatingFloor(rating: number): number {
    return Math.floor(rating);
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.productService.searchProducts(this.searchTerm).subscribe({
        next: (products) => {
          this.filteredProducts = products;
        }
      });
    } else {
      this.filteredProducts = this.products;
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredProducts = this.products;
  }

  navigateToProduct(product: Product): void {
    this.router.navigate(['/product', product.id], {
      queryParams: { category: product.category }
    });
  }

  addToCart(event: Event, product: Product): void {
    event.stopPropagation();
    this.productService.addToCart(product);
  }
}
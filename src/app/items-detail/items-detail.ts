import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService, Product } from '../services/product-service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-items-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './items-detail.html',
  styleUrls: ['./items-detail.css']
})
export class ItemsDetail implements OnInit {
   product: Product | null = null;
  category: string = '';
  isInCart: boolean = false;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.category = this.route.snapshot.queryParams['category'] || '';
      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.isInCart = this.productService.isInCart(product.id);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.product = null;
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    if (this.product) {
      this.productService.addToCart(this.product);
      this.isInCart = true;
    }
  }

  removeFromCart(): void {
    if (this.product) {
      this.productService.removeFromCart(this.product.id);
      this.isInCart = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
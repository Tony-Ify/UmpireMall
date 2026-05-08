import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product-service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product-card/product-card';
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadProduct(id);
    });

    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || 'Not specified';
    });
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.checkIfInCart();
      },
      error: (error) => {
        console.error('Error loading product:', error);
      }
    });
  }

  checkIfInCart() {
    if (this.product) {
      this.isInCart = this.productService.isInCart(this.product.id);
    }
  }

  addToCart() {
    if (this.product) {
      this.productService.addToCart(this.product);
      this.isInCart = true;
    }
  }

  removeFromCart() {
    if (this.product) {
      this.productService.removeFromCart(this.product.id);
      this.isInCart = false;
    }
  }
}
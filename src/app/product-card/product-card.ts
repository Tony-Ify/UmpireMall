import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Product {  
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',

  
})
export class ProductCard {
  @Input() product!: Product;
  @Input() selected: boolean = false; 
  @Output() select = new EventEmitter<Product>(); 
  
  onCardClick(): void {
    this.select.emit(this.product);
  }
}
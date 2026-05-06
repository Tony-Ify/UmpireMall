import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from '../nav-bar/nav-bar';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../product-card/product-card';


@Component({
  selector: 'app-root',
  imports: [CommonModule, NavBar, ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('UmpireMall');

  products: Product[] = [
    {
      id: 1,
      name: 'Nike Sneakers',
      description: 'Comfortable running shoes with advanced cushioning technology for everyday wear',
      price: 299,
      imageUrl: 'UmpireMall\src\assets\Images\sneakers.webp'
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Track your fitness, receive notifications, and more with this stylish smart watch.',
      price: 199.99,
      imageUrl: 'UmpireMall\src\assets\Images\smart watch.webp'
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for immersive audio experience.',
      price: 449.99,
      imageUrl: 'UmpireMall\src\assets\Images\wireless headphones.webp'
    },
    {
      id: 4,
      name: 'Laptop Backpack',
      description: 'Durable water-resistant backpack with padded compartment for 15-inch laptops.',
      price: 129.99,
      imageUrl: 'UmpireMall\src\assets\Images\laptop backpack.webp'
    },
    {
      id: 5,
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with thermal carafe to keep coffee hot for hours.',
      price: 79.99,
      imageUrl: 'UmpireMall\src\assets\Images\coffee maker.webp'
    },
  ];
  
    cart: Product[] = [];
  searchQuery: string = '';
  
  get filteredProducts(): Product[] {
    if (!this.searchQuery.trim()) {
      return this.products;
    }
    const query = this.searchQuery.toLowerCase().trim();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(query)
    );
  }
  
  onSearch(query: string): void {
    this.searchQuery = query;
  }
  
  // Updated to toggle between add and remove
  toggleCart(product: Product): void {
    const index = this.cart.findIndex(p => p.id === product.id);
    
    if (index === -1) {
      // Add to cart if not already there
      this.cart.push(product);
      console.log(`Added ${product.name} to cart. Cart size: ${this.cart.length}`);
    } else {
      // Remove from cart if already there
      this.cart.splice(index, 1);
      console.log(`Removed ${product.name} from cart. Cart size: ${this.cart.length}`);
    }
  }
  
  // Alternative: Keep both methods if needed
  addToCart(product: Product): void {
    const exists = this.cart.some(p => p.id === product.id);
    if (!exists) {
      this.cart.push(product);
      console.log(`Added ${product.name} to cart. Cart size: ${this.cart.length}`);
    }
  }
  
  removeFromCart(product: Product): void {
    const index = this.cart.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      console.log(`Removed ${product.name} from cart. Cart size: ${this.cart.length}`);
    }
  }
  
  isSelected(product: Product): boolean {
    return this.cart.some(p => p.id === product.id);
  }

}
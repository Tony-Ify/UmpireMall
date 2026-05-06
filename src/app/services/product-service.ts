import { Injectable } from '@angular/core';
import { Product } from '../product-card/product-card';
import { Observable } from 'rxjs/internal/Observable';  
import { HttpClient } from '@angular/common/http';   
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
 private apiUrl = 'http://localhost:3000/products';
  
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  // Product API methods
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Cart functionality methods
  getCartItems(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product): void {
    const exists = this.cartItems.some(item => item.id === product.id);
    if (!exists) {
      this.cartItems.push(product);
      this.updateCart();
      console.log(`Added ${product.name} to cart. Cart size: ${this.cartItems.length}`);
    }
  }

  removeFromCart(productId: number): void {
    const removedProduct = this.cartItems.find(item => item.id === productId);
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
    if (removedProduct) {
      console.log(`Removed ${removedProduct.name} from cart. Cart size: ${this.cartItems.length}`);
    }
  }

  toggleCart(product: Product): void {
    const exists = this.cartItems.some(item => item.id === product.id);
    if (exists) {
      this.removeFromCart(product.id);
    } else {
      this.addToCart(product);
    }
  }

  isInCart(productId: number): boolean {
    return this.cartItems.some(item => item.id === productId);
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
    console.log('Cart cleared');
  }

  getCartTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  getCartCount(): number {
    return this.cartItems.length;
  }

  private updateCart(): void {
    this.cartSubject.next(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}


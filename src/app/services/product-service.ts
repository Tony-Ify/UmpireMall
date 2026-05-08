import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../product-card/product-card';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartSubject.next(JSON.parse(savedCart));
    }
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getCart(): Product[] {
    return this.cartSubject.value;
  }

  addToCart(product: Product): void {
    const currentCart = this.cartSubject.value;
    if (!this.isInCart(product.id)) {
      const updatedCart = [...currentCart, product];
      this.cartSubject.next(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== productId);
    this.cartSubject.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  isInCart(productId: number): boolean {
    return this.cartSubject.value.some(item => item.id === productId);
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  }
}
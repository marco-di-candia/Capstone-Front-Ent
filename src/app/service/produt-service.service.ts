import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product,CartItem } from '../interfaces/Product ';
import { ShopDTO } from '../interfaces/Shop.DTO';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL = 'http://localhost:8080/api';

  private cart: CartItem[] = [];
  private cartTotalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartTotal$: Observable<number> = this.cartTotalSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Ottieni tutti i prodotti dal backend
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/products`);
  }

  addToCart(product: Product): Observable<CartItem[]> {
    // Check if the product already exists in the cart
    const existingCartItem = this.cart.find(item => item.id === product.id);

    if (existingCartItem) {
      // If exists, update the quantity
      existingCartItem.amount++;
      return this.http.put<CartItem[]>(`${this.apiURL}/shops/${existingCartItem.id}`, existingCartItem);
    } else {
      // Otherwise, add as a new item in the cart
      const newCartItem: CartItem = {
      id: product.id,
      name: product.name,
      amount: 1,
      price: product.price,
      imageUrl: product.imageUrl,
      // Aggiungi le proprietà mancanti con valori di default o null
      totalPrice: product.price,
      description: '', // Esempio di stringa vuota
      categoria: "",// Esempio di array vuoto
      };
      
      return this.http.post<CartItem[]>(`${this.apiURL}/shops`, newCartItem);
    }
  }

  // Rimuovi un prodotto dal carrello
  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/shops/${id}`);
  }

  // Ottieni tutti gli shop
  getAllShops(): Observable<ShopDTO[]> {
    return this.http.get<ShopDTO[]>(`${this.apiURL}/shops`);
  }

  // Elimina uno shop
  deleteShop(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/shops/${id}`);
  }

  // Restituisci la lista del carrello
  getCartList(): Observable<CartItem[]> {
    return new Observable((obs) => {
      obs.next(this.cart);
    });
  }
  fetchCartTotal(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/shops/total`);
  }
  updateCartTotal() {
    this.fetchCartTotal().subscribe(total => {
      this.cartTotalSubject.next(total);
    });
  }

  // Restituisci il totale del carrello
  getCartTotal(): Observable<number> {
    return this.cartTotalSubject.asObservable();
  }
}

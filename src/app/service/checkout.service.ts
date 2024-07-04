import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:8080/api/checkout/process'; 

  constructor(private http: HttpClient) { }

  submitOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderData);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  countNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `cart`, {
      productId: id,
    });
  }
  getloggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `cart`);
  }

  removSpacificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart/${id}`);
  }
  removAllCartItem(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart`);
  }

  updateCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `cart/${id}`, {
      count: count,
    });
  }

  checkOutSession(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        `orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        data,
      }
    );
  }

  CashOrder(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/${id}`, {
      data,
    });
  }
}

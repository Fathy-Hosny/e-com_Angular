import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WischlistService {
    private readonly httpClient = inject(HttpClient);

     addProductToWischlist(id: string): Observable<any> {
        return this.httpClient.post(environment.baseUrl + `wishlist`, {
          productId: id
        });
      }
    getloggedUserWischlist(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `wishlist`);
  }

        removSpacificWischlistItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `wishlist/${id}`);
  }


  
}

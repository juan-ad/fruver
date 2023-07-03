import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  addOrder(order:any): Observable<any>{
    return this.httpClient.post(`${this.url}/orders`, order);
  }

  dispatchOrder(id:any): Observable<any>{
    return this.httpClient.put(`${this.url}/orders`, {id});
  }

  getOrders(): Observable<any>{
    return this.httpClient.get(`${this.url}/orders`);
  }

}

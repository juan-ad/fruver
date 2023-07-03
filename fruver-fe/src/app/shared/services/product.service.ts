import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(product:any): Observable<any>{
    return this.httpClient.post(`${this.url}/products`, product);
  }

  update(product:any): Observable<any>{
    return this.httpClient.put(`${this.url}/products`, product);
  }

  get(): Observable<any>{
    return this.httpClient.get(`${this.url}/products`);
  }

  delete(id:any): Observable<any>{
    return this.httpClient.delete(`${this.url}/products/${id}`);
  }
}

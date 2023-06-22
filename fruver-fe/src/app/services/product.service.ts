import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(`${this.url}/products`, data);
  }

  update(data:any){
    return this.httpClient.put(`${this.url}/products`, data);
  }

  get(){
    return this.httpClient.get(`${this.url}/products`);
  }

  delete(id:any){
    return this.httpClient.delete(`${this.url}/products/${id}`);
  }
}

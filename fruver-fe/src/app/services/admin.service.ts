import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  signUp(data:any): Observable<any>{
    return this.httpClient.post(`${this.url}/admin/singup`, data);
  }

  login(data:any): Observable<any>{
    return this.httpClient.post(`${this.url}/admin/login`, data);
  }

  checkToken(){
    return this.httpClient.get(`${this.url}/admin/checkToken`);
  }
}

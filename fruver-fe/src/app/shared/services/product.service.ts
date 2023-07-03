import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /**
   * Variable que captura la url principal para consumir los respecivos endpoints
   */
  url = environment.apiUrl;

  /**
   * Constructor de la clase
   * @param httpClient - Servicio inyectado que permite realizar solicitudes HTTP
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Método que permite el registro de un producto
   * @param product - Producto a registrar
   * @returns Observable de la consulta
   */
  addProduct(product:any): Observable<any>{
    return this.httpClient.post(`${this.url}/products`, product);
  }

  /**
   * Método que permite la actualización de un producto
   * @param product - Producto a actualizar
   * @returns Observable de la consulta
   */
  updateProduct(product:any): Observable<any>{
    return this.httpClient.put(`${this.url}/products`, product);
  }

  /**
   * Método que permite obtener todos los productos registrados hasta el momento
   * @returns Observable de la consulta
   */
  getproducts(): Observable<any>{
    return this.httpClient.get(`${this.url}/products`);
  }

  /**
   * Método que permite eliminar un producto
   * @param id - Id del producto a eliminar
   * @returns Observable de la consulta
   */
  deleteProduct(id:any): Observable<any>{
    return this.httpClient.delete(`${this.url}/products/${id}`);
  }
}

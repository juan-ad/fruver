import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
   * Método que permite el registro de una solicitud de compra
   * @param order - Pedido a registrar
   * @returns Observable de la consulta
   */
  addOrder(order:any): Observable<any>{
    return this.httpClient.post(`${this.url}/orders`, order);
  }

  /**
   * Método que permite consolidar y notificar al ciente el envìo de su pedido
   * @param id - Id del pedido
   * @returns Observable de la consulta
   */
  dispatchOrder(id:any): Observable<any>{
    return this.httpClient.put(`${this.url}/orders`, {id});
  }

  /**
   * Método que permite obtener todos los pedidos, que aún no han sido atentidos 
   * @returns Observable de la consulta
   */
  getOrders(): Observable<any>{
    return this.httpClient.get(`${this.url}/orders`);
  }

}

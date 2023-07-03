import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
   * Método que permite a un usaurio iniciar sesión, obteniendo el respectivo token
   * @param data - Objeto con el email y contraseña del usuario
   * @returns Observable de la consulta
   */
  login(data:any): Observable<any>{
    return this.httpClient.post(`${this.url}/users/login`, data);
  }
}

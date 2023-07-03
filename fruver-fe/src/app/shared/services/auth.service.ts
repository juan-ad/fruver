import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Constructor de la clase
   * @param router - Servicio que proporciona navegación entre vistas y capacidades de manipulación de URL
   */
  constructor(private router: Router) { }

  /**
   * Mètodo que permite saber si un usuario está autenticado
   * @returns true si el token existe en el almacenamiento local, de lo contrario retorna false
   */
  public isAuthenticated(): boolean{
    const token = localStorage.getItem('token');
    if (!token){
      this.router.navigate(['/']);
      return false;
    }else{
      return true;
    }
  }
}

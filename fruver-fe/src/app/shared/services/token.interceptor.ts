import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  /**
   * Constructor de la clase
   * @param router - Servicio que proporciona navegación entre vistas y capacidades de manipulación de URL
   */
  constructor(private router: Router) {}

  /**
   * Método que permite interceptar y modificar las solicitudes HTTP salientes,
   * y las respuestas entrantes antes de que lleguen a su destino final.
   * Cada vez que se consuma un endpoint, se enviará el token en el encabezado
   * @param request - Solicitud entrante
   * @param next - Manejador de solicitudes
   * @returns Observable de la consulta
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token){
      // Se modifica la solicitud antes de enviarla
      request = request.clone({
        setHeaders: {authorization: `Bearer ${token}`}
      });
    }
    // Enviar la solicitud modificada al siguiente manejador
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if (err instanceof HttpErrorResponse){
          if (err.status === 401 || err.status === 403){
            if(this.router.url !== '/'){
              localStorage.clear();
              this.router.navigate(['/']);
            }
          }
        }
        return throwError(() => new Error(err));
      })
    );
  }
}

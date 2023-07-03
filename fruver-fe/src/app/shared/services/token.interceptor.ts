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

  constructor(private router: Router) {}

  // Cada vez que se consuma un endpoint se enviará el token en el encabezado
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token){
      request = request.clone({
        setHeaders: {authorization: `Bearer ${token}`}
      });
    }
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

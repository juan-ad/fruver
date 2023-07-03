import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  /**
   * Constructor de la clase
   * @param snackbar - Servicio de envío de mensajes de snack bar Material Design
   */
  constructor(private snackbar: MatSnackBar) { }

  /**
   * Método que permite mostar un mensaje en donde se requiera
   * @param message - Mensaje a mostrar
   * @param action - Acción a establecer
   */
  openSnackBar(message:string, action:string){
    if (action == 'error'){
      this.snackbar.open(message, '',{
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['black-snackbar']
      });
    }else{
      this.snackbar.open(message, '',{
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['green-snackbar']
      });
    }
  }
}

import { Component, OnInit, EventEmitter, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit{

  /**
   * Variable que permite emitir eventos, para 
   * la comunicación entre componentes
   */
  onEmitStatusChange = new EventEmitter();

  /**
   * Variable para obtener el detalle del mensaje
   */
  details:any = {};

  /**
   * Constructor de la clase
   * @param dialogData - Servicio para inyectar datos en un cuadro de diálogo (dialog) que se abre 
   * utilizando el MatDialog de Angular Material.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any){}

  /**
   * Inicializador de la clase, donde se asigna el valor del dialogData
   * a la variable details, si el dialogData existe.
   */
  ngOnInit(): void {
    if(this.dialogData){
      this.details = this.dialogData;
    }
  }

  /**
   * Método que permite disparar el evento, cuando se da click en el 
   * botó de "Si"
   */
  handleChangeAction(){
    this.onEmitStatusChange.emit();
  }
}

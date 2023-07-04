import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  /**
   * Arreglo de columnas a mostrar en la tabla
   */
  displayedColumns: string[] = ['name', 'price', 'amount', 'subtotal'];

  /**
   * Fuente de datos a ser cargada en la tabla
   */
  dataSource: any;

  /**
   * Variable que almacenará los datos provenientes del componente
   * que invoca a OrderDatailComponent
   */
  data:any;

  /**
   * Constructor de la clase
   * @param dialogData - Servicio para inyectar datos en un cuadro de diálogo (dialog) que se abre 
   * utilizando el MatDialog de Angular Material
   * @param dialogRef - Servicio que permite controlar y manipular los cuadros de diálogo modales 
   */
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
    public dialogRef: MatDialogRef<OrderDetailComponent>
  ) {}

  /**
   * Inicializador de la clase, donde se carga la respectiva data
   */
  ngOnInit(): void {
    this.data = this.dialogData.data;
    this.dataSource = this.data.product_orders;
  }
}
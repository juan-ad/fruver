import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  /**
   * Arreglo de columnas a mostrar en la tabla
   */
  displayedColumns: string[] = ['customerName', 'customerIdentificationNumber', 'customerEmail', 'shoppingAddress', 'total', 'view' ];

  /**
   * Fuente de datos a ser cargada en la tabla
   */
  dataSource: any;

  /**
   * Mensaje de respuesta
   */
  responseMessage: any;

  /**
   * Referencia al componente MatPaginator
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Constructor de la clase
   * @param orderService - Inyección del servicio de pedidos
   * @param dialog - Servicio utilizado para abrir cuadros de diálogo modales de Material Design
   * @param snackbarService - Servicio para mostrar mensajes
   * @param router - Servicio que proporciona navegación entre vistas y capacidades de manipulación de URL
   * @param paginatorIntl - Clase que permite personalizar las etiquetas y los textos del componente MatPaginator
   * @param ngxService - Sevicio que permite controlar y gestionar los indicadores de carga en la aplicación 
   */
  constructor(private orderService: OrderService, 
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private paginatorIntl: MatPaginatorIntl,
    private ngxService: NgxUiLoaderService,
  ) {}

  /**
   * Inicializador de la clase, donde se invoca al método tableData()
   */
  ngOnInit(): void {
    this.tableData();
  }

  /**
   * Método que permite cargar los pedidos a la tabla de Angular Material
   */
  tableData(){
    this.orderService.getOrders().subscribe({
      next: (orders:any) => {
        orders.forEach((order:any) => {
          order.customerName = order.customer.name,
          order.customerIdentificationNumber = order.customer.identificationNumber,
          order.customerEmail = order.customer.email
        });
        this.dataSource = new MatTableDataSource(orders);
        this.dataSource.paginator = this.paginator;
        this.paginatorIntl.itemsPerPageLabel = "Elementos por página";
        this.paginatorIntl.nextPageLabel = 'Siguiente';
        this.paginatorIntl.previousPageLabel = 'Anterior';
        this.paginatorIntl.firstPageLabel = 'Primera página';
        this.paginatorIntl.lastPageLabel = 'Última página';
      },
      error: (error:any) => {
        if (error.error?.message){
          this.responseMessage = error.error?.message;
        }else{
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }

  /**
   * Método que permite realizar un filtro a la tabla de pedidos
   * @param event - Evento generado
   */
  applyFilter(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  /**
   * Método que permite visualizar el componente OrderDetailComponent en un modal,
   * para visualizar el detalle de un pedido
   * @param order - Detalle del pedido a visualizar
   */
  handleViewAction(order:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: order
    }
    dialogConfig.width = "100%";
    const dialogRef = this.dialog.open(OrderDetailComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }

  /**
   * Método que permite consolidar y notificar al ciente el envío de su pedido
   * @param id - Id del pedido a consolidar y enviar
   */
  dispatchOrder(id:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: "Consolidar y Enviar el pedido?"
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((resp:any) => {
      dialogRef.close();
      this.ngxService.start();
      this.orderService.dispatchOrder(id).subscribe({
        next: (response:any) => {
          this.ngxService.stop();
          this.snackbarService.openSnackBar(response.message, "Èxito");
          this.tableData();
        },
        error: (error:any) => {
          if (error.error?.message){
            this.responseMessage = error.error?.message;
          }else{
            this.responseMessage = GlobalConstants.genericError;
          }
          this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        }
      });
    });
  }
}

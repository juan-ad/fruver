import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ProductComponent } from '../product/product.component';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ProductService } from 'src/app/shared/services/product.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  /**
   * Arreglo de columnas a mostrar en la tabla
   */
  displayedColumns: string[] = ['name', 'description', 'price', 'image', 'status', 'edit'];

  /**
   * Fuente de datos a ser cargada en la tabla
   */
  dataSource: any = [];

  /**
   * Mensaje de respuesta
   */
  responseMessage:any;

  /**
   * Referencia al componente MatPaginator
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Constructor de la clase
   * @param productService - Inyección del servicio de productos
   * @param dialog - Servicio utilizado para abrir cuadros de diálogo modales de Material Design
   * @param snackbarService - Servicio para mostrar mensajes
   * @param router - Servicio que proporciona navegación entre vistas y capacidades de manipulación de URL
   * @param paginatorIntl - Clase que permite personalizar las etiquetas y los textos del componente MatPaginator
   */
  constructor(private productService: ProductService,
    private dialog:MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private paginatorIntl: MatPaginatorIntl) { }

  /**
   * Inicializador de la clase, donde se invoca al método tableData()
   */
  ngOnInit(): void {
    this.tableData();
  }

  /**
   * Método que permite cargar los productos a la tabla de Angular Material
   */
  tableData(){
    this.productService.getproducts().subscribe({
      next: (response:any)=>{
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.paginatorIntl.itemsPerPageLabel = "Elementos por página";
        this.paginatorIntl.nextPageLabel = 'Siguiente';
        this.paginatorIntl.previousPageLabel = 'Anterior';
        this.paginatorIntl.firstPageLabel = 'Primera página';
        this.paginatorIntl.lastPageLabel = 'Última página';
      },
      error: (err:any) =>{
        if(err.error?.message){
          this.responseMessage = err.error?.message;
        }else{
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  
  }

  /**
   * Método que permite realizar un filtro a la tabla de productos
   * @param event - Evento generado
   */
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Método que permite visualizar el componente ProductComponent en un modal,
   * para agregar un nuevo producto
   */
  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Añadir'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe((response:any) => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddProduct.subscribe((response:any)=>{
      this.tableData();
    });
  }

  /**
   * Método que permite visualizar el componente ProductComponent en un modal,
   * para editar un determinado producto
   * @param product - Producto a editar
   */
  handleEditAction(product:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Editar',
      data: product
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe((response:any) => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditProduct.subscribe((response:any)=>{
      this.tableData();
    });
  }

  /**
   * Método que permite eliminar un producto dado su id
   * @param product - Producto a eliminar
   */
  handleDeleteAction(product:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'eliminar el producto?',
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any) => {
      this.productService.deleteProduct(product.id).subscribe({
        next: (response:any) => {
          this.tableData();
          this.responseMessage = response.message;
          this.snackbarService.openSnackBar(this.responseMessage, "success");
          dialogRef.close();
        },
        error: (err:any) => {
          if(err.error?.message){
            this.responseMessage = err.error?.message;
          }else{
            this.responseMessage = GlobalConstants.genericError;
          }
          this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error)
        }
      });
    });
  }


}

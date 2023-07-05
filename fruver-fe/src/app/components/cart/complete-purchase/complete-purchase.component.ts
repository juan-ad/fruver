import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { OrderService } from 'src/app/shared/services/order.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-complete-purchase',
  templateUrl: './complete-purchase.component.html',
  styleUrls: ['./complete-purchase.component.scss']
})
export class CompletePurchaseComponent implements OnInit{

  /**
   * Variable que permite emitir un evento, cuando la solicitud de compra es exitosa
   */
  onBuy = new EventEmitter();

  /**
   * Mensaje de respuesta
   */
  responseMessage:any;

  /**
   * Variable que representa un grupo de controles de formulario
   */
  productForm:any = FormGroup;

  /**
   * Productos que se almacenaron en el carrito de compras
   */
  private products:any[] = [];

  /**
   * Constructor de la clase
   * @param dialogData - Servicio para inyectar datos en un cuadro de diálogo (dialog) que se abre 
   * utilizando el MatDialog de Angular Material
   * @param formBuilder - Clase que proporciona métodos para generar instancias de formularios y controles reactivos
   * @param orderService - Inyección del servicio de pedidos
   * @param dialogRef - Servicio que permite controlar y manipular los cuadros de diálogo modales 
   * @param snackbarService - Servicio para mostrar mensajes
   */
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<CompletePurchaseComponent>,
    private snackbarService: SnackbarService){}

  
  /**
   * Inicializador de la clase, donde se definen los controles del formulario
   */
  ngOnInit():void{
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      identificationNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.numRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      phone: [null, [Validators.required, Validators.pattern(GlobalConstants.numRegex)]],
      shoppingAddress: [null, [Validators.required]],
    });
    this.products = this.dialogData.data;
  }

  /**
   * Método que permite realizar el proceso de solicitud de una compra
   */
  buy(){
    let formData = this.productForm.value;
    let customer = {
      name: formData.name,
      identificationNumber: formData.identificationNumber,
      email: formData.email,
      phone: formData.phone,
      
    }
    const order: any = {
      shoppingAddress: formData.shoppingAddress,
      status: false,
      total: this.products.reduce(function (acc, product) { return acc + (product.amount * product.price); }, 0),
      customer: customer,
      productList: this.products
    }
    
    this.orderService.addOrder(order).subscribe({
      next: (response:any) => {
        this.dialogRef.close();
        this.onBuy.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, "success");
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
  }
}

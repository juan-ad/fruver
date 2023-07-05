import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { CompletePurchaseComponent } from '../complete-purchase/complete-purchase.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  /**
   * Carrito observador
   */
  myCart$ = this.cartService.myCart$;

  /**
   * Constructor de la clase
   * @param cartService - Inyección del servicio del carrito de compras
   * @param dialog - Servicio utilizado para abrir cuadros de diálogo modales de Material Design
   * @param router - Servicio que proporciona navegación entre vistas y capacidades de manipulación de URL
   */
  constructor(private cartService: ShoppingCartService,
    private dialog: MatDialog,
    private router: Router,
  ){}

  /**
   * Inicializador de la clase
   */
  ngOnInit(): void {
    
  }

  /**
   * Método que permite actualizar las unidades de cada producto
   * @param operation - Tipo de operación a realizar (minus/add)
   * @param id - Id del producto
   */
  updateUnits(operation:any, id:number){
    const product = this.cartService.findProductById(id);
    if (product){
      if (operation === 'minus' && product.amount > 0){
        product.amount -= 1;
      }else if (operation === 'add'){
        product.amount += 1;
      }
      if (product.amount === 0){
        this.deleteProduct(id);
      }
    }
  }

  /**
   * Método que permite eliminar un producto del carrito de compras
   * @param id - Id del producto
   */
  deleteProduct(id:any){
    this.cartService.deleteProduct(id);
  }

  /**
   * Método que permite obtener el cálculo del precio de un producto x sus unidades
   * @param price - Precio del producto
   * @param units - Unidades compradas del producto
   * @returns el cálculo del precio de un producto x sus unidades
   */
  totalProduct(price:number, units:number): number{
    return price * units;
  }

  /**
   * Método que permite calcular el valor total de la compra
   * @returns el valor total de la compra
   */
  totalCart(){
    return this.cartService.totalCart();
  }

  /**
   * Método que permite visualizar el componente CompletePurchaseComponent en un modal,
   * para agregar continuar con el proceso de compra
   */
  buy(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: this.cartService.getList()
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CompletePurchaseComponent, dialogConfig);
    this.router.events.subscribe((response:any) => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onBuy.subscribe((response:any)=>{
      this.cartService.resetCart();
    });
  }

}

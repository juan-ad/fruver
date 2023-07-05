import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../components/user/login/login.component';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Carrito observable
   */
  public viewCart: boolean = false;
  myCart$ = this.cartService.myCart$;

  /**
   * Constructor de la clase
   * @param dialog - Servicio utilizado para abrir cuadros de diálogo modales de Material Design
   * @param router - Servicio que proporciona navegación entre vistas y capacidades de manipulación de URL
   */
  constructor(private dialog: MatDialog, 
    private router: Router,
    private cartService: ShoppingCartService){}

  /**
   * Inicializador de la clase
   */
  ngOnInit(): void {
  }

  /**
   * Método que permite abrir el modal para visualizar
   * el componente de Login
   */
  loginAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px";
    this.dialog.open(LoginComponent, dialogConfig);
  }
  
  /**
   * Método que permite ocultar o mostrar el carrito de compras
   */
  onToggleCart(){
    this.viewCart = !this.viewCart;
  }
}

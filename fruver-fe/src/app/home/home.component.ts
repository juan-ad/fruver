import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../components/user/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Constructor de la clase
   * @param dialog - Servicio utilizado para abrir cuadros de diálogo modales de Material Design.
   * @param router - Servicio que proporciona navegación entre vistas y capacidades de manipulación de URL.
   */
  constructor(private dialog: MatDialog, 
    private router: Router){}

  /**
   * Inicializador de la clase, donde si el usuario está autenticado, 
   * se lo redirige al dashboard
   */
  ngOnInit(): void {
    if (localStorage.getItem('token') != null){
      this.router.navigate(['/fruver/dashboard']);
    }
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
  
}

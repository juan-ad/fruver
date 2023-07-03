import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  /**
   * Constructor de la clase
   * @param router - Servicio que proporciona navegación entre vistas y capacidades de manipulación de URL
   * @param dialog - Servicio utilizado para abrir cuadros de diálogo modales de Material Design
   */
  constructor(private router: Router,
    private dialog: MatDialog) {
  }

  /**
   * Método que sirve para cerrar sesión, donde se abre una ventana de diálogo 
   * para confirmar el cierre de seisón, y si es afirmativo, se limpia el almacenamiento
   * local y se redirige a la raiz del aplicativo.
   */
  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: "cerrar sesión?"
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user:any) => {
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
    });
  }
}


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
  role: any;
  constructor(private router: Router,
    private dialog: MatDialog) {

  }

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

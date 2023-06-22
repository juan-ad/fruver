import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../components/admin/login/login.component';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router, private adminService: AdminService){}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null){
      this.router.navigate(['/fruver/dashboard']);
    }
  }

  loginAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px";
    this.dialog.open(LoginComponent, dialogConfig);
  }
  
}

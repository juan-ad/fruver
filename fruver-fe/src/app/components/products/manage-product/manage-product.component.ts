import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ProductComponent } from '../product/product.component';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'image', 'status', 'edit'];
  dataSource: any = [];
  responseMessage:any;

  constructor(private productService: ProductService,
    private dialog:MatDialog,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.productService.get().subscribe({
      next: (response:any)=>{
        this.dataSource = new MatTableDataSource(response);
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

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
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

  handleEditAction(element:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: element
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

  handleDeleteAction(element:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'eliminar el producto?',
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any) => {
      this.deleteProduct(element.id, dialogRef);
    });
  }

  deleteProduct(id:any, dialogRef: any){
    this.productService.delete(id).subscribe({
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
  }

}

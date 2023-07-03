import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/shared/services/product.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage:any;
  selectedImage: any;
  base64Image: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder: FormBuilder,
  private productService: ProductService,
  public dialogRef: MatDialogRef<ProductComponent>,
  private snackbarService: SnackbarService){}

  ngOnInit():void{
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      //image: [null, [Validators.required]],
    });

    if(this.dialogData.action == 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      
    }
  }

  handleSubmit(){
    if(this.dialogAction == 'Edit'){
      this.edit();
    }else{
      this.add();
    }
  }

  add(){
    let formData = this.productForm.value;
    let data = {
      name: formData.name,
      description: formData.descriprion,
      price: formData.price,
      image: this.base64Image,
    }
    this.productService.add(data).subscribe({
      next: (response:any) => {
        this.dialogRef.close();
        this.onAddProduct.emit();
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

  edit(){
    let formData = this.productForm.value;
    let data = {
      id: this.dialogData.data.id,
      name: formData.name,
      description: formData.descriprion,
      price: formData.price,
      image: formData.image,
    }
    this.productService.update(data).subscribe({
      next: (response:any) => {
        this.dialogRef.close();
        this.onAddProduct.emit();
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

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedImage = file;
  
    this.convertToBase64();
  }

  convertToBase64() {
    const reader = new FileReader();
  
    reader.onload = (event: any) => {
      this.base64Image = event.target.result;
    };
  
    reader.readAsDataURL(this.selectedImage);
  }
}

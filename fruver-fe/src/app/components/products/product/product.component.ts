import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ProductService } from 'src/app/shared/services/product.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  
  /**
   * Variable que permite emitir un evento, cuando el componente
   * se encuentre en modo Añadir
   */
  onAddProduct = new EventEmitter();

  /**
   * Variable que permite emitir un evento, cuando el componente
   * se encuentre en modo Editar
   */
  onEditProduct = new EventEmitter();

  /**
   * Variable que representa un grupo de controles de formulario
   */
  productForm:any = FormGroup;

  /**
   * Variable que almacena la acción del diálogo (Añadir/Editar)
   */
  dialogAction:any = "Añadir";

  /**
   * Título a mostrar en formulario
   */
  action:any = "Añadir";

  /**
   * Mensaje de respuesta
   */
  responseMessage:any;

  /**
   * Imagen de tipo file
   */
  selectedImage: any;

  /**
   * Imagen en base64
   */
  base64Image: string = "";

  /**
   * Constructor de la clase
   * @param dialogData - Servicio para inyectar datos en un cuadro de diálogo (dialog) que se abre 
   * utilizando el MatDialog de Angular Material
   * @param formBuilder - Clase que proporciona métodos para generar instancias de formularios y controles reactivos
   * @param productService - Inyección del servicio de productos
   * @param dialogRef - Servicio que permite controlar y manipular los cuadros de diálogo modales 
   * @param snackbarService - Servicio para mostrar mensajes
   */
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductComponent>,
    private snackbarService: SnackbarService){}

  /**
   * Inicializador de la clase, donde se definen los controles del formulario y 
   * se valida si el componente está en modo edición
   */
  ngOnInit():void{
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      price: [null, [Validators.required, Validators.pattern(GlobalConstants.numRegex)]],
      available: [true]
    });

    if(this.dialogData.action == 'Editar'){
      this.dialogAction = "Editar";
      this.action = "Actualizar";
      this.productForm.get('name').setValue(this.dialogData.data.name);
      this.productForm.get('description').setValue(this.dialogData.data.description);
      this.productForm.get('price').setValue(this.dialogData.data.price);
      this.productForm.get('available').setValue(this.dialogData.data.available);
    }
  }

  /**
   * Método que permite controlar la acción del diálogo, determinando 
   * si se debe añadir o actualizar un producto
   */
  handleSubmit(){
    if(this.dialogAction == 'Editar'){
      this.edit();
    }else{
      this.add();
    }
  }

  /**
   * Método que permite agregar un nuevo producto 
   */
  add(){
    let formData = this.productForm.value;
    let data = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image: this.base64Image,
      available: formData.available
    }
    this.productService.addProduct(data).subscribe({
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

  /**
   * Método que permite editar un producto 
   */
  edit(){
    let formData = this.productForm.value;
    let data = {
      id: this.dialogData.data.id,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image: this.base64Image != "" ? this.base64Image : this.dialogData.data.image,
      available: formData.available
    }
    this.productService.updateProduct(data).subscribe({
      next: (response:any) => {
        this.dialogRef.close();
        this.onEditProduct.emit();
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

  /**
   * Método que permite capturar la imagen seleccionada
   * @param event - Evento actual
   */
  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedImage = file;
    this.convertToBase64();
  }

  /**
   * Método que permite convertir la imagen a base64
   */
  convertToBase64() {
    const reader = new FileReader();
  
    reader.onload = (event: any) => {
      this.base64Image = event.target.result;
    };
  
    reader.readAsDataURL(this.selectedImage);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Variable que representa un grupo de controles de formulario
   */
  loginForm:any = FormGroup;

  /**
   * Variable que define el mensaje de respuesta
   */
  responseMessage:any;

  /**
   * Constructor de la clase
   * @param formBuilder - Clase que proporciona métodos para generar instancias de formularios y controles reactivos
   * @param router - Servicio que proporciona navegación entre vistas y capacidades de manipulación de URL
   * @param userService - Inyección del servicio de usuarios
   * @param dialogRef - Servicio que permite controlar y manipular los cuadros de diálogo modales 
   * @param ngxService - Sevicio que permite controlar y gestionar los indicadores de carga en la aplicación 
   * @param snackbarService - Servicio para mostrar mensajes
   */
  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private userService: UserService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
    ){ }

  /**
   * Inicializador de la clase, donde se definien los controles del formulario
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]]
    });
  }

  /**
   * Método que permite iniciar sesión a un usuario,
   * donde si el usuario y contraseña son correctos, 
   * se redirige al dashboard de administración.
   */
  handleSubmit(){
    this.ngxService.start();
    let formData = this.loginForm.value;
    let data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.login(data).subscribe({
      next: (response:any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        localStorage.setItem('token', response.token);
        this.router.navigate(['/fruver/dashboard']);
      },
      error: (err:any) => {
        this.ngxService.stop();
        if (err.error?.message){
          this.responseMessage = err.error?.message;
        }else{
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }
}

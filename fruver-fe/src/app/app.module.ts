import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FullComponent } from './layouts/full/full.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { LoginComponent } from './components/user/login/login.component';
import { TokenInterceptor } from './shared/services/token.interceptor';
import { MatIconModule } from '@angular/material/icon';
import { ManageProductComponent } from './components/products/manage-product/manage-product.component';
import { ProductComponent } from './components/products/product/product.component';

/**
 * Configuración para agregar un indicador de carga (loader) a la aplicación
 * curante la carga de contenido asíncrono
 */
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "Cargando...",
  textColor: "#FFFFFF",
  textPosition: 'center-center',
  pbColor: "red",
  bgsColor: "red",
  fgsColor: "red",
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    ManageProductComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    MatIconModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [HttpClientModule, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

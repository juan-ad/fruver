import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import jwt_decode from 'jwt-decode';
import { MenuItems } from 'src/app/shared/services/menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy{

  /**
   * Variable que sirve para aplicar estilos y diseños diferentes según las
   * características de un dispositivo o ventana de navegación
   */
  mobileQuery: MediaQueryList;

  /**
   * Variable que obtiene el token del usuario en sesión
   */
  token:any = localStorage.getItem('token');

  /**
   * Variable que obtiene el payload del token
   */
  tokenPayload:any;

  private _mobileQueryListener: () => void;

  /**
   * Constructor de la clase
   * @param changeDetectorRef - Servicio para controlar el ciclo de detección de cambios (change detection) de los componentes
   * @param media - Servicio utilizado para detectar cambios en las consultas de medios CSS y realizar acciones en función de las características del dispositivo o del entorno de ejecución.
   * @param menuItems - Servicio utilizado para mostrar el menú de opciones de la barra lateral
   */
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.tokenPayload = jwt_decode(this.token);
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  /**
   * Método que permite realizar la limpieza y liberación de recursos antes de que el componente sea destruido y eliminado de la memoria.
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
}


import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnDestroy{
  
  /**
   * Variable que sirve para aplicar estilos y diseños diferentes según las
   * características de un dispositivo o ventana de navegación
   */
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  /**
   * Constructor de la clase
   * @param changeDetectorRef - Servicio para controlar el ciclo de detección de cambios (change detection) de los componentes
   * @param media - Servicio utilizado para detectar cambios en las consultas de medios CSS y realizar acciones en función de las características del dispositivo o del entorno de ejecución.
   */
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
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

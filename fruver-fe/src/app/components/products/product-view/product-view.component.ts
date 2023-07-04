import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  /**
   * Lista de los productos
   */
  products!: any[];

  /**
   * Lista de opciones de ordenamiento
   */
  sortOptions!: any[];

  /**
   * Variable para ordenar los datos por defecto
   */
  sortOrder!: number;

  /**
   * Llave de ordenamiento
   */
  sortKey!: string;

  /**
   * Nombre de la propiedad de los datos, que se usará 
   * en la clasificación de forma predeterminada
   */
  sortField!: string;

  /**
   * Constructor de la clase
   * @param productService - Inyección del servicio de productos
   * @param cartService - Inyección del servicio del carrito de compras
   */
  constructor(private productService: ProductService,
    private cartService: ShoppingCartService){ }

  /**
   * Inicializador de la clase, donde se carga los productos disponibles, en el componente
   * DataView de Primeng
   */
  ngOnInit(): void {
    this.productService.getproducts().subscribe((response:any)=>{
      this.products = response.filter((product:any) => product.available != false );
    });
    this.sortOptions = [
      {label: 'De mayor a menor precio', value: '!price'},
      {label: 'De menor a mayor precio', value: 'price'}
    ];
  }

  /**
   * Método que permite añadir un producto al carrito de compras
   * @param product 
   */
  addToCart(product:any){
    this.cartService.addProduct(product);
  }

  /**
   * Método que permite ordenar los productos por el precio
   * @param event - Evento generado
   */
  onSortChange(event:any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  /**
   * Método que permite establecer el filtro de búsqueda en el DataView
   * @param dv - Referencia al componente DataView
   * @param event - Evento generado
   */
  filter(dv:any, event:any){
    dv.filter(event.target.value);
  }
}


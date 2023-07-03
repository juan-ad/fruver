import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { OrderService } from '../shared/services/order.service';
import jwt_decode from 'jwt-decode';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  	/**
	 * Variable para contar los productos registrados hasta el momento
     */
  	countProducts: number = 0;

	/**
	 * Variable para contar los pedidos que aún no se han atendido
     */
  	countOrdersAttend: number = 0;

  	/**
     * Variable para obtener el usuario en sesiòn
     */
	user:any;

  	/**
     * Constructor de la clase
     * @param productService - Inyección del servicio de productos
     * @param orderservice - Inyección del servicio de pedidos
     */
	constructor(private productService: ProductService, private orderservice: OrderService) {}

  	/**
   	 * Inicializador de la clase, donde se obtiene el usuario en sesión,
     * el número de productos y el número de pedidos que no se han atendido hasta el momento
     */
	ngOnInit() {
		const token:any = localStorage.getItem('token');
		try{
		  this.user = jwt_decode(token);
		}
		catch(err){
		  this.user = {};
		}
		this.productService.getproducts().subscribe((products:any) => {
			this.countProducts = products.length;	
		});
		this.orderservice.getOrders().subscribe((orders:any) => {
			this.countOrdersAttend = orders.length;	
		});
	}
}
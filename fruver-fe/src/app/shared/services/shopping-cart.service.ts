import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  /**
   * Variable que captura la url principal para consumir los respecivos endpoints
   */
  url = environment.apiUrl;

  /**
   * Constructor de la clase
   */
  constructor() { }

  // Variable que se utiliza para almacenar los productos en el carrito de compras
  private myList:any[]=[];

  // Carrito observable (emitir y suscribirse)
  private myCart = new BehaviorSubject<any[]>([]); 
  myCart$ = this.myCart.asObservable();

  /**
   * Método que permite añadir un producto al carrito de compras
   * @param product - Producto a almacenar en el carrito de compras
   */
  addProduct(product:any){
    if (this.myList.length === 0){
      product.amount = 1;
      this.myList.push(product);
      this.myCart.next(this.myList);
    }else{
      const productExist = this.myList.find((element:any) => {
        return element.id === product.id;
      });
      if (productExist){
        product.amount += 1;
        this.myCart.next(this.myList);
      }else{
        product.amount = 1;
        this.myList.push(product);
        this.myCart.next(this.myList);
      }
    }
  }

  /**
   * Método que permite eliminar un producto del carrito de compras
   * @param id - Id del producto
   */
  deleteProduct(id:number){
    this.myList = this.myList.filter( (product:any) => {
      return product.id !== id;
    });
    this.myCart.next(this.myList);
  }

  /**
   * Método que permite obtener un producto del carrito de compras
   * @param id - Id del producto
   */
  findProductById(id: number){
    return this.myList.find( (product:any) => {
      return product.id === id;
    });
  }
  
 /**
  * Método que permite calcular el valor total de la compra
  * @returns el valor total de la compra
  */
  totalCart():number {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.amount * product.price); }, 0)
    return total
  }

  /**
   * Método que permite reiniciar el carrito de compras
   */
  resetCart(){
    this.myList = [];
    this.myCart.next(this.myList);
  }

  /**
   * Método que permite obtener el carrito de compras
   * @returns carrito de compras
   */
  getList(): any[]{
    return this.myList;
  }
}

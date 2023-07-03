import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  // Lista carrito
  private myList:any[]=[];

  // Carrito observable
  private myCart = new BehaviorSubject<any[]>([]); 
  myCart$ = this.myCart.asObservable();

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

  deleteProduct(id:number){
    this.myList = this.myList.filter( (product:any) => {
      return product.id !== id;
    });
    this.myCart.next(this.myList);
  }

  findProductById(id: number){
    return this.myList.find( (product:any) => {
      return product.id === id;
    });
  }
  
  totalCart() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.amount * product.price); }, 0)
    return total
  }

  resetCart(){
    this.myList = [];
    this.myCart.next(this.myList);
  }

  getList(){
    return this.myList;
  }
}

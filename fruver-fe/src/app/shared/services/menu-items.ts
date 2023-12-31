import { Injectable } from "@angular/core";

/**
 * Interace que contiene los atributos del menú
 */
export interface Menu{
    state: string,
    name: string;
    icon: string;
    role: string;
}

/**
 * Arreglo con las tres opciones que se visualizarán en el menú
 */
const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: ''},
    { state: 'products', name: 'Gestión de productos', icon: 'inventory_2', role: 'admin'},
    { state: 'orders', name: 'Gestión de pedidos', icon: 'import_contacts', role: 'admin'}
]

@Injectable({
    providedIn: 'root'
  })
export class MenuItems {

    /**
     * Método que sirve para obtener la lista de opciones
     * @returns lista de opciones
     */
    getMenuItems(): Menu[]{
        return MENUITEMS;
    }
}
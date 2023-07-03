import { Injectable } from "@angular/core";

export interface Menu{
    state: string,
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: ''},
    { state: 'products', name: 'Gestión de productos', icon: 'inventory_2', role: 'admin'},
    { state: 'orders', name: 'Gestión de pedidos', icon: 'import_contacts', role: 'admin'}
]

@Injectable({
    providedIn: 'root'
  })
export class MenuItems {

    getMenuItems(): Menu[]{
        return MENUITEMS;
    }
}
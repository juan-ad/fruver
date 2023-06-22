import { Injectable } from "@angular/core";

export interface Menu{
    state: string,
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: ''},
    { state: 'products', name: 'Manage Products', icon: 'inventory_2', role: 'admin'}
]

@Injectable()
export class MenuItems {

    getMenuItems(): Menu[]{
        return MENUITEMS;
    }
}
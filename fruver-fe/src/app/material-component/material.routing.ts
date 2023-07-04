import { Routes } from '@angular/router';
import { ManageProductComponent } from '../components/products/manage-product/manage-product.component';
import { RouteGuardService } from '../shared/services/route-guard.service';
import { ViewOrderComponent } from '../components/orders/view-order/view-order.component';

/**
 * Configuración de rutas para la gestión de productos y pedidos
 */
export const MaterialRoutes: Routes = [
    {
        path: 'products',
        component: ManageProductComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole:['admin']
        }
    },
    {
        path: 'orders',
        component: ViewOrderComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole:['admin']
        }
    }
];

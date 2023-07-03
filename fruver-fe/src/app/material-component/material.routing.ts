import { Routes } from '@angular/router';
import { ManageProductComponent } from '../components/products/manage-product/manage-product.component';
import { RouteGuardService } from '../shared/services/route-guard.service';

export const MaterialRoutes: Routes = [
    {
        path: 'products',
        component: ManageProductComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole:['admin']
        }
    }
];

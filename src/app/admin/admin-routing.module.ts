import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProductsComponent, AddProductComponent, EditProductComponent, OrdersComponent } from './components';
import { CanDeactivateGuard } from './../core';
import { AuthGuard } from '../core/guards/auth.guard';
import { ProductsStatePreloadingGuard } from '../products/guards';

const routes: Routes = [
  {
  path: '',
  component: AdminComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      canActivateChild: [AuthGuard],
      children: [
        {
          path: 'add',
          component: AddProductComponent,
          canDeactivate: [CanDeactivateGuard],
        },
        {
          path: 'edit/:productID',
          component: EditProductComponent,
          canDeactivate: [CanDeactivateGuard]
        },
        {
          path: 'orders',
          component: OrdersComponent
        },
        {
          path: '',
          component: ProductsComponent,
          canActivate: [ProductsStatePreloadingGuard]
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static components = [AdminComponent, ProductsComponent, AddProductComponent, EditProductComponent, OrdersComponent];
}

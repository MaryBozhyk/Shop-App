import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListComponent, ProductPageComponent } from './components';
import { ProductsStatePreloadingGuard, ProductExistsGuard } from './guards';

const routes: Routes = [
  {
    path: 'home',
    component: ProductsListComponent,
    canActivate: [ProductsStatePreloadingGuard],
  },
  {
    path: 'product/:productID',
    component: ProductPageComponent,
    canActivate: [ProductExistsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

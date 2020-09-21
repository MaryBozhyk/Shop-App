import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListComponent, ProductPageComponent } from './components';

const routes: Routes = [
  {
    path: 'home',
    component: ProductsListComponent
  },
  {
    path: 'product/:productID',
    component: ProductPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

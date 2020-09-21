import { NgModule } from '@angular/core';

import {
  FirstComponent,
  ProductsListComponent,
  ProductComponent,
  ButtonComponent,
  SizeButtonComponent,
  ProductPageComponent
} from './components';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    FirstComponent,
    ProductComponent,
    ButtonComponent,
    SizeButtonComponent,
    ProductsListComponent,
    ProductPageComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductModule { }

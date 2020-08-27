import { NgModule } from '@angular/core';

import { CartListComponent } from './../cart-list/cart-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CartListComponent,
    CartItemComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CartListComponent
  ]
})
export class CartModule { }

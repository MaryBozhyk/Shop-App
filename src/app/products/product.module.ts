import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstComponent } from './first/first.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './products-list/product/product.component';
import { ButtonComponent } from './button/button.component';
import { SizeButtonComponent } from './size-button/size-button.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FirstComponent,
    ProductsListComponent,
    ProductComponent,
    ButtonComponent,
    SizeButtonComponent
  ],
  imports: [ CommonModule, SharedModule ],
  exports: [
    FirstComponent,
    ProductsListComponent,
    ProductComponent
  ]
})
export class ProductModule { }

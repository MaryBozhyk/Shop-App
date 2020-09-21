import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { AdminComponent } from './admin.component';
import { ProductComponent } from './components/product/product.component';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    AdminRoutingModule.components,
    AdminComponent,
    ProductComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

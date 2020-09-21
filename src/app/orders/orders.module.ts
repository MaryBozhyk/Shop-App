import { NgModule } from '@angular/core';

import { OrdersComponent } from './orders.component';
import { SharedModule } from '../shared';
import { OrdersRoutingModule } from './orders-routing.module';


@NgModule({
  declarations: [ OrdersComponent ],
  imports: [
    SharedModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }

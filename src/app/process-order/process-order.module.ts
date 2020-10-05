import { NgModule } from '@angular/core';

import { ProcessOrderComponent } from './process-order.component';
import { SharedModule } from '../shared';
import { CoreModule } from '../core/core.module';
import { ProcessOrderRoutingModule} from './process-order-routing.module';

@NgModule({
  declarations: [ ProcessOrderComponent ],
  imports: [
    SharedModule,
    CoreModule,
    ProcessOrderRoutingModule
  ]
})
export class ProcessOrderModule { }

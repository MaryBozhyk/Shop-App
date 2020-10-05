import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessOrderComponent } from './process-order.component';
import { CanDeactivateGuard } from '../core';

const routes: Routes = [
  {
    path: '',
    component: ProcessOrderComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessOrderRoutingModule { }

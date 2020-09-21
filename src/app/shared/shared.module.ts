import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HighlightDirective, ChangeColorDirective } from './directives';
import { OrderByPipe } from './pipes/order-by.pipe';
import { BackButtonComponent, MainButtonComponent } from './components';

const COMPONENTS = [
  HighlightDirective,
  ChangeColorDirective,
  OrderByPipe,
  BackButtonComponent,
  MainButtonComponent
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ]
})
export class SharedModule { }

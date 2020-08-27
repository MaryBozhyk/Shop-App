import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HighlightDirective } from './directives/highlight.directive';
import { ChangeColorDirective } from './directives/change-color.directive';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [HighlightDirective, ChangeColorDirective, OrderByPipe],
  imports: [CommonModule, FormsModule],
  exports: [HighlightDirective, ChangeColorDirective, OrderByPipe, CommonModule, FormsModule]
})
export class SharedModule { }

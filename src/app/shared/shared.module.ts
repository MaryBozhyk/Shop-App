import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { ChangeColorDirective } from './directives/change-color.directive';

@NgModule({
  declarations: [HighlightDirective, ChangeColorDirective],
  imports: [CommonModule],
  exports: [HighlightDirective, ChangeColorDirective]
})
export class SharedModule { }

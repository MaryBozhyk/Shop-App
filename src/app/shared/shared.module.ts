import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight.directive';

@NgModule({
  declarations: [HighlightDirective],
  imports: [CommonModule],
  exports: [HighlightDirective]
})
export class SharedModule { }
// желательно контент этой папки разложить по папкам согласно типам

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { EmailPatternDirective } from './validators';

@NgModule({
  declarations: [EmailPatternDirective],
  imports: [SharedModule],
  exports: [EmailPatternDirective]
})
export class CoreModule { }

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PathNotFoundComponent, AboutComponent, LoginComponent } from './components';


@NgModule({
  declarations: [ PathNotFoundComponent, AboutComponent, LoginComponent ],
  imports: [
    SharedModule
  ]
})
export class LayoutModule { }

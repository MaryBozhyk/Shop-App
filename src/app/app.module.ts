import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CartModule } from './cart-list/cart.module';
import { ProductModule } from './products/product.module';
import { AboutComponent } from './layout/components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CartModule,
    ProductModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

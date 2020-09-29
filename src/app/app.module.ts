import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { ProductModule } from './products/product.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { httpInterceptorProviders } from './core';
import { RootStoreModule } from './core/@ngrx/root-store.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ProductModule,
    LayoutModule,
    HttpClientModule,
    RootStoreModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

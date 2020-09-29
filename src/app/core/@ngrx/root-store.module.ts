import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { ProductsStoreModule } from './products/products-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../../../environments/environment';
import { EffectsModule } from '@ngrx/effects';

import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { routerReducers, CustomSerializer, RouterEffects } from './router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      serializer: CustomSerializer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ProductsStoreModule
  ]
})
export class RootStoreModule { }

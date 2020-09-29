import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError, take, tap, delay } from 'rxjs/operators';

import { Product, ProductModel } from 'src/app/shared';
import { HttpProductObservableService } from 'src/app/products';

import { Store, select } from '@ngrx/store';
import { selectSelectedProductByUrl } from './../../core/@ngrx';
import * as ProductsActions from './../../core/@ngrx/products/products.actions';
import * as RouterActions from './../../core/@ngrx/router/router.actions';

@Injectable({
  providedIn: 'any'
})
export class ProductResolveGuard implements Resolve<Product> {
  constructor(
    private store: Store,
  ) {}

  resolve(): Observable<Product> | null {
    console.log('ProductsResolve Guard is called');

    return this.store.pipe(
      select(selectSelectedProductByUrl),
      tap(product => this.store.dispatch(ProductsActions.setOriginalProduct({ product }))),
      delay(2000),
      map((product: ProductModel) => {
        if (product) {
          return product;
        } else {
          this.store.dispatch(RouterActions.go({
            path: ['/admin']
          }));
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.store.dispatch(RouterActions.go({
          path: ['/admin']
        }));
        return of(null);
      }),
    );
  }
}

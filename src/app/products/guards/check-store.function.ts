import { select, Store } from '@ngrx/store';
import { selectProductsLoaded } from './../../core/@ngrx';
import * as ProductsActions from './../../core/@ngrx/products/products.actions';

import { Observable } from 'rxjs';
import { tap, filter, take } from 'rxjs/operators';

export function checkStore(store: Store): Observable<boolean> {
  return store.pipe(
    select(selectProductsLoaded),
    tap((loaded: boolean) => {
      if (!loaded) {
        store.dispatch(ProductsActions.getProducts());
      }
    }),
    filter((loaded: boolean) => loaded),
    take(1)
  );
}

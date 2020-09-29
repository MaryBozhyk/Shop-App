import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import {
  selectProductsData,
  selectProductsError,
  selectSelectedProductByUrl
} from './products.selectors';
import * as productsActions from './../../../core/@ngrx/products/products.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

import { Observable } from 'rxjs';

import { Product, ProductModel } from 'src/app/shared';
import { NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsFacade {
  products$: Observable<ReadonlyArray<Product>>;
  productsError$: Observable<Error | string>;
  selectedProductByUrl$: Observable<ProductModel>;

  constructor(private store: Store) {
    this.products$ = this.store.pipe(select(selectProductsData));
    this.productsError$ = this.store.pipe(select(selectProductsError));
    this.selectedProductByUrl$ = this.store.pipe(select(selectSelectedProductByUrl));
  }

  addProduct(props: { product: Product }) {
    this.store.dispatch(productsActions.addProduct(props));
  }

  updateProduct(props: { product: Product, url: string }) {
    this.store.dispatch(productsActions.updateProduct(props));
  }

  deleteProduct(props: { product: Product }) {
    this.store.dispatch(productsActions.deleteProduct(props));
  }

  goTo(props: {
    path: any[];
    queryParams?: object;
    extras?: NavigationExtras;
  }) {
    this.store.dispatch(RouterActions.go(props));
  }
}

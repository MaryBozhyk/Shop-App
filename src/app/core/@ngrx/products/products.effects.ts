import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import * as RouterActions from './../router/router.actions';

import { Observable, of } from 'rxjs';
import { catchError, map, pluck, switchMap, concatMap, tap } from 'rxjs/operators';

import { HttpProductObservableService, HttpProductService } from 'src/app/products/services';
import { Product, ProductModel } from 'src/app/shared';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private httpProductObservableService: HttpProductObservableService,
    private httpProductService: HttpProductService,
  ) {
    console.log('[PRODUCTS EFFECTS]');
  }

  getProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      switchMap(action => this.getProducts())
    )
  );

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      concatMap(({product, url}) => this.updateProduct(product, url))
    )
  );

  addProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.addProduct),
      pluck('product'),
      concatMap((product: Product) => this.addProduct(product))
    )
  );

  deleteProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      pluck('product'),
      concatMap((product: ProductModel) => this.deleteProduct(product))
    )
  );

  createUpdateDeleteProductSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.addProductSuccess, ProductsActions.updateProductSuccess, ProductsActions.deleteProductSuccess),
      map(action => {
        let path;
        if (action.type === '[Delete Product Effect] DELETE_PRODUCT_SUCCESS') {
          path = ['/admin'];
        } else if (action.type === '[Update Product Effect] UPDATE_PRODUCT_SUCCESS') {
          path = [action.url, {id: action.product.id}];
        } else {
          path = ['/admin', {id: action.product.id}];
        }
        return RouterActions.go({ path });
      })
    )
  );

  private getProducts() {
    return this.httpProductService
    .getAllProducts()
    .then(products => ProductsActions.getProductsSuccess({ products }))
    .catch(error => ProductsActions.getProductsError({ error }));
  }

  private updateProduct(product: ProductModel, url: string) {
    return this.httpProductObservableService
    .updateProduct(product)
    .pipe(
      map(updatedProduct => ProductsActions.updateProductSuccess({ product: updatedProduct, url })),
      catchError(error => of(ProductsActions.updateProductError({ error })))
    );
  }

  private addProduct(product: ProductModel) {
    return this.httpProductService
    .addProduct(product)
    .then((createdProduct: Product) => {
      return ProductsActions.addProductSuccess({ product: createdProduct });
    })
    .catch(error => ProductsActions.addProductError({ error }));
  }

  private deleteProduct(product: ProductModel) {
    return this.httpProductService
    .deleteProduct(product)
    .then((deletedProduct: Product) => {
      return ProductsActions.deleteProductSuccess({ product: deletedProduct });
    })
    .catch(error => ProductsActions.deleteProductError({ error }));
  }
}

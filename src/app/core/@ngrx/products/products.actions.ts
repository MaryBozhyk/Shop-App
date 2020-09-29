import { createAction, props } from '@ngrx/store';

import { Product } from 'src/app/shared';

export const getProducts = createAction('[Products List Page (App)] GET_PRODUCTS');

export const getProductsSuccess = createAction(
  '[Get Products Effect] GET_PRODUCTS_SUCCEESS',
  props<{ products: Product[] }>()
);

export const getProductsError = createAction(
  '[Get Products Effect] GET_PRODUCTS_ERROR',
  props<{ error: Error | string }>()
);

export const addProduct = createAction(
  '[Add Product Page] ADD_PRODUCT',
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  '[Add Product Effect] ADD_PRODUCT_SUCCESS',
  props<{ product: Product }>()
);

export const addProductError = createAction(
  '[Add Product Effect] ADD_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const updateProduct = createAction(
  '[Edit Product Page] UPDATE_PRODUCT',
  props<{ product: Product, url: string }>()
);

export const updateProductSuccess = createAction(
  '[Update Product Effect] UPDATE_PRODUCT_SUCCESS',
  props<{ product: Product, url: string }>()
);

export const updateProductError = createAction(
  '[Update Product Effect] UPDATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const deleteProduct = createAction(
  '[Edit Product Page] DELETE_PRODUCT',
  props<{ product: Product }>()
);

export const deleteProductSuccess = createAction(
  '[Delete Product Effect] DELETE_PRODUCT_SUCCESS',
  props<{ product: Product }>()
);

export const deleteProductError = createAction(
  '[Delete Product Effect] DELETE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const setOriginalProduct = createAction(
  '[Edit Page (App)] SET_ORIGINAL_PRODUCT',
  props<{ product: Product }>()
);

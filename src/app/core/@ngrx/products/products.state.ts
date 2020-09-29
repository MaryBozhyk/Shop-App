import { Product } from 'src/app/shared';

export interface ProductsState {
  data: ReadonlyArray<Product>;
  originalProduct: Readonly<Product>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialProductsState: ProductsState = {
    data: [ ],
    originalProduct: null,
    loading: false,
    loaded: false,
    error: null
};

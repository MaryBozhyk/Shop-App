import { InjectionToken } from '@angular/core';

export const ProductsAPI = new InjectionToken<string>('ProductsAPI', {
  providedIn: 'any',
  factory: () => 'http://localhost:3000/products'
});

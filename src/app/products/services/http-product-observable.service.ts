import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Product } from '../../shared';
import { ProductsAPI } from '../products.config';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class HttpProductObservableService {

  constructor(
    private http: HttpClient,
    @Inject(ProductsAPI) private productsUrl: string
  ) { }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;

    return this.http.get<Product>(url).pipe(
        retry(3),
        share(),
        catchError(this.handleErr)
    );
  }

  updateProduct(updatedItem: Product): Observable<Product> {
    const url = `${this.productsUrl}/${updatedItem.id}`;
    const body = JSON.stringify(updatedItem);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
          .put<Product>(url, body, options)
          .pipe(catchError(this.handleErr));
  }

  private handleErr(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}

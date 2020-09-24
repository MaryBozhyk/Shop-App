import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class HttpProductService {
  private productsUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Promise<Product[]> {
    return this.http
      .get(this.productsUrl)
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);
  }

  addProduct(product: Product): Promise<Product> {
    const url = this.productsUrl;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
  }

  deleteProduct(product: Product): Promise<Product> {
    const url = `${this.productsUrl}/${product.id}`;

    return (
      this.http
        .delete(url)
        .toPromise()
        .catch(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

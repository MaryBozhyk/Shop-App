import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from '../../../shared';

import { Subject, Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { selectProductsData, selectProductsError } from './../../../core/@ngrx';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  bestSeller: Product;

  products$: Observable<ReadonlyArray<Product>>;
  productsError$: Observable<Error | string>;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectProductsData));
    this.productsError$ = this.store.pipe(select(selectProductsError));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  trackByName(index: number, product: Product): string {
    return product.name;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from '../../../shared';

import { Subject, Observable } from 'rxjs';

import { ProductsFacade } from './../../../core/@ngrx';
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

  constructor(private productsFacade: ProductsFacade) { }

  ngOnInit(): void {
    this.products$ = this.productsFacade.products$;
    this.productsError$ = this.productsFacade.productsError$;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  trackById(index: number, product: Product): string {
    return product.id;
  }
}

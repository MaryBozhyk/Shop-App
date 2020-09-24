import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpProductService, HttpProductObservableService } from '../../services';
import { Product } from '../../../shared';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Promise<Product[]>;
  bestSeller: Product;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private httpProductService: HttpProductService,
    private httpProductObservableService: HttpProductObservableService
  ) { }

  ngOnInit(): void {
    this.products = this.httpProductService.getAllProducts();
    this.httpProductObservableService.getProduct(0)
    .pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(product => this.bestSeller = product);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  trackByName(index: number, product: Product): string {
    return product.name;
  }

}

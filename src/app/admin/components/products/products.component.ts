import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/shared';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { selectProductsData } from './../../../core/@ngrx';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<ReadonlyArray<Product>>;
  editedItemId: number;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectProductsData));
    this.editedItemId = +this.router.url.slice(10);
  }

  trackByName(index: number, product: Product): string {
    return product.name;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/shared';

import { Observable } from 'rxjs';

import { ProductsFacade } from './../../../core/@ngrx';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<ReadonlyArray<Product>>;
  editedItemId: number;

  constructor(
    private productsFacade: ProductsFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products$ = this.productsFacade.products$;
    this.editedItemId = +this.router.url.slice(10);
  }

  trackById(index: number, product: Product): string {
    return product.id;
  }
}

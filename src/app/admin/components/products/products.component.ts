import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/shared';
import { HttpProductService } from 'src/app/products';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Promise<Product[]>;
  sub: Subscription;
  editedItemId: number;

  constructor(
    private httpProductService: HttpProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.products = this.httpProductService.getAllProducts();
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.editedItemId = +params.id;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  trackByName(index: number, product: Product): string {
    return product.name;
  }
}

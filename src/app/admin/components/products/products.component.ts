import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/shared';
import { ProductService } from '../../../products/services/product.service';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Observable<Product[]>;
  sub: Subscription;
  editedItemId: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
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

import { Component, Input } from '@angular/core';

import { ProductsFacade } from './../../../core/@ngrx';

import { Product } from '../../../shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  @Input() item: Product;

  constructor(private productsFacade: ProductsFacade) { }

  onBuy() {
    const link = ['product/', this.item.id];
    this.productsFacade.goTo({ path: link });
  }
}

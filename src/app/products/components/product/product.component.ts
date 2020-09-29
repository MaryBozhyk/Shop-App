import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

import { Product } from '../../../shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  @Input() item: Product;

  constructor(private store: Store) { }

  onBuy() {
    const link = ['product/', this.item.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }
}
